const { generateFileWithCode } = require("../Utils/fileUtils/generateFile");
const { executeCode } = require("../Utils/fileUtils/executeCode");
const HttpError = require("../models/http-Error");
const languagesMap = require("../Utils/Language/getAllLangauges");


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
        const output = await executeCode(filePath, input, languageExt);
        return res.status(200).json({
            CodeOutput: output
        });
    } catch (error) {
        return next(new HttpError(error.message, error.errorCode));
    }
};

module.exports = { runCodeWithCompiler };   