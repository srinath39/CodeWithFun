const mongoose = require("mongoose");
const ProblemModel = require("../models/problemSchema");
const { generateFileWithCode } = require("../Utils/fileUtils/generateFile");
const { executeCode } = require("../Utils/fileUtils/executeCode");
const { getCommandForASpecificLanguage } = require("../Utils/fileUtils/generateCommand");
const languagesMap = require("../Utils/Language/getAllLangauges");
const HttpError = require("../models/http-Error");
const { performance } = require('perf_hooks');
const SubmissionModel = require("../models/submissionSchema");

const runCodeWithCompiler = async (req, res, next) => {
    const { languageExt, code, input } = req.body;

    // data validation
    // if user have'nt choosen any language ,   by default it should be any language example : c++
    if (!languageExt) {
        languageExt = 'cpp';
    }
    // if no code is provided irrespective of any language, we need to throw an error
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }

    // Automation in creating a file(Language Specfic) in codes folder and copying the code in it and return the file path 
    try {
        const filePath = generateFileWithCode(languagesMap.get(languageExt), languageExt, code);
        // this execution need to different for different Lanugages 
        let languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt, input);
        const output = await executeCode(input, languageSpecificCommand);
        return res.status(200).json({
            CodeOutput: output.trim()
        });
    } catch (error) {
        return next(new HttpError(error.message, error.errorCode));
    }
};


const submitProblemCode = async (req, res, next) => {
    const problemId = req.params.problemId;
    const userId = req.userId;

    // check the id follows correct format or not 
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    const { languageExt, code } = req.body;
    // if user have'nt choosen any language , by default it should be any language example : c++
    if (!languageExt) {
        languageExt = 'cpp';
    }
    // if no code is provided , we need to throw an error
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
            new Error("Problem does'nt have any test cases to run");
        }

        // Automation in creating a file(Language Specfic) in codes folder and copying the code in it and return the file path 
        const filePath = generateFileWithCode(languagesMap.get(languageExt), languageExt, code);
        // get Language Specific Command 
        let languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt, true);


        // run the test Cases
        const totalTestcases = testCasesArray.length;
        let testCasesPassed = 0;
        const startTime = performance.now();
        for (const testCase of testCasesArray) {
            const { input, expectedOutput } = testCase;
            const actualOutput = await executeCode(input, languageSpecificCommand);
            if (expectedOutput.trim() == actualOutput.trim()) {
                testCasesPassed = testCasesPassed + 1;
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
                verdictMsg: `${totalTestcases}/${testCasesPassed} test cases passed`
            });
        } else {
            return res.status(200).json({ totalTestcases, testCasesPassed, verdictMsg: `${totalTestcases}/${testCasesPassed} test cases passed\nWrong answer at test case ${testCasesPassed + 1}` });  // Do i need to send this to the Common error middleWare
        }

    } catch (error) {
        return next(new HttpError(error.message | "Something Went Wrong in Submission , Please Try again", 500));
    }
};


module.exports = { runCodeWithCompiler, submitProblemCode };  