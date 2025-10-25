const mongoose = require("mongoose");
const ProblemModel = require("../models/problemSchema");
const { generateFileWithCode } = require("../Utils/fileUtils/generateFile");
const { executeCode } = require("../Utils/fileUtils/executeCode");
const { getCommandForASpecificLanguage } = require("../Utils/fileUtils/generateCommand");
const languagesMap = require("../Utils/Language/getAllLangauges");
const HttpError = require("../models/http-Error");


const runCodeWithCompiler = async (req, res, next) => {
    const { code, languageExt, input } = req.body;

    // data validation
    // if user have'nt choosen any language , by default it should be any language example : c++
    if (!languageExt) {
        languageExt = 'cpp';
    }
    // if no code is provided , we need to throw an error
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }

    if (!input) {
        input = '';
    }

    // Automation in creating a file(Language Specfic) in codes folder and copying the code in it and return the file path 
    try {
        const filePath = generateFileWithCode(languagesMap.get(languageExt), languageExt, code);
        // this execution need to different for different Lanugages 
        let languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt);
        const output = await executeCode(input, languageSpecificCommand);
        return res.status(200).json({
            CodeOutput: output
        });
    } catch (error) {
        return next(new HttpError(error.message, error.errorCode));
    }
};


const submitProblemCode = async (req, res, next) => {
    const problemId = req.params.problemId;

    // check the id follows correct format or not 
    if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return next(new HttpError("problem Id Format is wrong, try with correct Id format", 400));
    }

    const { code, languageExt } = req.body;
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
        let languageSpecificCommand = getCommandForASpecificLanguage(filePath, languageExt);


        // run the test Cases
        const totalTestcases = testCasesArray.length;
        let testCasesPassed = 0;
        for (const testCase of testCasesArray) {
            const { input, expectedOutput } = testCase;
            const actualOutput = await executeCode(input, languageSpecificCommand);
            if (expectedOutput != actualOutput) {
                return res.status(404).json({ totalTestcases, testCasesPassed, verdict: `Wrong answer at test case ${testCasesPassed + 1}`, actualOutput });  // Do i need to send this to the Common error middleWare
            }
            testCasesPassed = testCasesPassed + 1;
        }
        return res.status(200).json({
            totalTestcases,
            verdict: "All test cases passed successfully"
        });

    } catch (error) {
        return next(new HttpError(error.message | "Something Went Wrong in Submission , Please Try again", 500));
    }
};


module.exports = { runCodeWithCompiler, submitProblemCode };  