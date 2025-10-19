const { generateFileWithCode } = require("../Utils/fileUtils/generateFile");
const { executeCode } = require("../Utils/fileUtils/executeCode");
const HttpError = require("../models/http-Error");


const runCodeWithCompiler = async (req, res,next) => {
    const { code, language, input } = req.body;

    // data validation
    // if user have'nt choosen any language , by default it should be any language example : c++
    if (!language) {
        language = 'C++';
    }
    // if no code is provided , we need to throw an error
    if (!code) {
        return next(new HttpError("The code is Empty, please provide the code", 404));
    }

    if(!input){
        input='';
    }

    // Automation in creating a file(Language Specfic) in codes folder and copying the code in it and return the file path 
    try {
        const filePath = generateFileWithCode(language,getLanguageExtWithLanguageName(language), code);
        const output = await executeCode(filePath, input);
        return res.status(200).json({
            CodeOutput: output
        });
    } catch (error) {
        return next(new HttpError(error.message, error.errorCode));
    }
};

const getLanguageExtWithLanguageName = (language) => {
    let lanExt;
    switch (language) {
        case 'C++':
            lanExt = 'cpp';
            break;
        case 'Java':
            lanExt = 'java';
            break;
        case 'Python':
            lanExt = 'py';
            break;
        default:
            lanExt = 'cpp';
    }
    return lanExt;
}

module.exports = { runCodeWithCompiler };   