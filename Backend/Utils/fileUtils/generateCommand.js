const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// Automation in creating a Directory for file storage
const dirCodes = path.join(__dirname, 'executableCodeFiles');

// ONly if the directory does'nt exit create it 
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });   // {recursive: "true"}
}


const getCommandForASpecificLanguage = (filePath, languageExt) => {
    // creating a file name from filePath
    const fileDir = path.dirname(filePath);
    const fileNameWithExt = path.basename(filePath);
    const fileName = fileNameWithExt.split('.')[0];
    let outputPath;
    let outputCommand;
    const input = process.env.INPUT_PLACEHOLDER;

    switch (languageExt) {
        case 'java':
            // No longer the  class Name and the file name need to be the same (As java version 11 or above doesn't require file to be compiled we can directly run the file using filename.java )
            outputCommand = `cd ${fileDir} && echo ${input} | java ${fileNameWithExt}`;
            break;
        case 'py':
            outputCommand = `cd ${fileDir} && echo ${input} | python ${fileNameWithExt}`;
            break;
        default:  // cpp 
            outputPath = path.join(dirCodes, `${fileName}.out`);
            outputCommand = `cd ${fileDir} && g++ ${fileNameWithExt} -o ${outputPath} && cd ${dirCodes} && echo ${input} | ${fileName}.out`;
            break;
    }   // if the command need to execute in Windows sysem use .exe /  if it need to be exceuted in docker since it is a linus env we need to use .out
    return outputCommand;
};

module.exports = { getCommandForASpecificLanguage };
