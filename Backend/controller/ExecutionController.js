const fs = require("fs");
const mongoose = require("mongoose");
const ProblemModel = require("../models/problemSchema");
const { generateFileWithCode } = require("../Utils/fileUtils/generateFile");
const { executeCode } = require("../Utils/fileUtils/executeCode");
const { getCommandForASpecificLanguage } = require("../Utils/fileUtils/generateCommand");
const languagesMap = require("../Utils/Language/getAllLangauges");
const HttpError = require("../models/http-Error");
const { performance } = require('perf_hooks');
const SubmissionModel = require("../models/submissionSchema");

const cleanupGeneratedFiles = (commandInfo = {}) => {
    const { cleanupDirs = [], cleanupExecDirs = [] } = commandInfo;
    for (const dir of cleanupDirs) {
        try {
            fs.rmSync(dir, { recursive: true, force: true });
        } catch (error) {
            // ignore cleanup failures
        }
    }
    for (const dir of cleanupExecDirs) {
        try {
            fs.rmSync(dir, { recursive: true, force: true });
        } catch (error) {
            // ignore cleanup failures
        }
    }
};

const runCodeWithCompiler = async (req, res, next) => {
    let { languageExt, code, input } = req.body;

    // data validation
    if (!languageExt) {
        languageExt = 'cpp';
    }
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }

    const filePath = generateFileWithCode(languageExt, code);
    const languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt);

    try {
        const output = await executeCode(input, languageSpecificCommand, languageExt);
        return res.status(200).json({
            CodeOutput: output.trim()
        });
    } catch (error) {
        if (error && error.type) {
            return next(new HttpError({
                errorType: error.type,
                errorMessage: error.message,
                errorOutput: error.errorOutput || '',
            }, error.errorCode || 400));
        }
        return next(new HttpError(error.message || "Execution failed", error.errorCode || 500));
    } finally {
        cleanupGeneratedFiles(languageSpecificCommand);
    }
};

const submitProblemCode = async (req, res, next) => {
    const problemId = req.params.problemId;
    const userId = req.userId;

    // check the id follows correct format or not 
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    let { languageExt, code } = req.body;
    if (!languageExt) {
        languageExt = 'cpp';
    }
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }

    try {
        // check if the problemId exist , if yes, return the problem with test cases 
        const codingProblem = await ProblemModel.findById({ _id: problemId });
        if (!codingProblem) {
            return next(new HttpError("Problem with this Id does'nt exist", 404));
        }

        const testCasesArray = codingProblem.testCases;
        if (!testCasesArray.length) {
            return next(new HttpError("Problem doesn't have any test cases to run", 400));
        }

        const filePath = generateFileWithCode(languageExt, code);
        const languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt);

        const totalTestcases = testCasesArray.length;
        let testCasesPassed = 0;
        const startTime = performance.now();
        for (const [index, testCase] of testCasesArray.entries()) {
            const { input, expectedOutput } = testCase;
            let actualOutput;
            try {
                actualOutput = await executeCode(input, languageSpecificCommand, languageExt);
            } catch (error) {
                if (error && error.type) {
                    return res.status(error.errorCode || 400).json({
                        errorType: error.type,
                        errorMessage: error.message,
                        errorOutput: error.errorOutput || '',
                        failedTestCase: index + 1,
                    });
                }
                return next(new HttpError(error.message || "Execution failed", error.errorCode || 500));
            }
            if (expectedOutput.trim() === actualOutput.trim()) {
                testCasesPassed += 1;
            } else {
                break;
            }
        }
        const endTime = performance.now();
        const duration = endTime - startTime;

        const isAlltestCasesPassed = testCasesPassed === totalTestcases;

        // Creating a submission record 
        let submissionResult = isAlltestCasesPassed ? 'Accepted' : 'Wrong Answer';
        let submissionRuntime = `${duration.toFixed(3)} ms`;

        const newSubmission = new SubmissionModel({
            userId,
            problemId,
            result: submissionResult,
            runtime: submissionRuntime,
            language: languagesMap.get(languageExt),
        });

        // save the record
        await newSubmission.save();


        // response to the frontend
        if (isAlltestCasesPassed) {
            return res.status(200).json({
                totalTestcases,
                testCasesPassed,
                verdictMsg: `${testCasesPassed}/${totalTestcases} test cases passed`
            });
        } else {
            return res.status(200).json({ totalTestcases, testCasesPassed, verdictMsg: `${testCasesPassed}/${totalTestcases} test cases passed\nWrong answer at test case ${testCasesPassed + 1}` });  // Do i need to send this to the Common error middleWare
        }

    } catch (error) {
        if (error && error.type) {
            return res.status(error.errorCode || 400).json({
                errorType: error.type,
                errorMessage: error.message,
                errorOutput: error.errorOutput || '',
            });
        }
        return next(new HttpError(error.message || "Something Went Wrong in Submission, Please try again", 500));
    } finally {
        cleanupGeneratedFiles(languageSpecificCommand);
    }
};

module.exports = { runCodeWithCompiler, submitProblemCode };