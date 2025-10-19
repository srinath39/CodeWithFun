const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");  // its an Api to talk with CMD in local system 


// Automation in creating a Directory for file storage
const dirCodes = path.join(__dirname, 'executableCodeFiles');

// ONly if the directory does'nt exit create it 
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });   // {recursive: "true"}
}

const executeCode = (filePath, input, languageExt) => {
    const languageSpecificCommand = getCommandForASpecificLanguage(filePath, input, languageExt);
    // execute the code
    return new Promise((resolve, reject) => {     // Promise  maintains atamocity , and wraps asynchronus operations in it 
        // exec is an higher order function which is an async operation 
        exec(languageSpecificCommand, (error, stdout, stderr) => {
            if (error) {
                reject({ type: "SYSTEM_ERROR", message: "Execution Failed, Something went wrong while executing command", errorOutput: error, errorCode: 500 });    // failure , throws an Error 
            }
            if (stderr) {
                reject({ type: "CODE ERROR", message: "A compilation or Runtime Error has been occured, please check the code", errorOutput: stderr, errorCode: 404 });    // failure , throws an Error 
            }
            if (stdout) {
                resolve(stdout);   // success , Returns the output 
            }
        });
    });
};

const getCommandForASpecificLanguage = (filePath, input, languageExt) => {
    // creating a file name from filePath
    const fileDir = path.dirname(filePath);
    const fileNameWithExt = path.basename(filePath);
    const fileName = fileNameWithExt.split('.')[0];
    let outputPath;
    let outputCommand;

    switch (languageExt) {
        case 'java':
            outputPath = path.join(dirCodes, `${fileName}.class`);
            outputCommand = `cd ${fileDir} && javac ${fileNameWithExt} -d ${outputPath} && cd ${dirCodes} && echo ${input} | java ${fileName}`;
            break;
        case 'py':
            outputCommand = `cd ${fileDir} && echo ${input} | python ${fileNameWithExt}`;
            break;
        default:  // cpp 
            outputPath = path.join(dirCodes, `${fileName}.exe`);
            outputCommand = `cd ${fileDir} && g++ ${fileNameWithExt} -o ${outputPath} && cd ${dirCodes} && echo ${input} | ${fileName}.exe`;
            break;
    }
    console.log(outputCommand);
    return outputCommand;
};

module.exports = { executeCode };