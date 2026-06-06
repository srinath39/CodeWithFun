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
    const fileDir = path.dirname(filePath);
    const fileNameWithExt = path.basename(filePath);
    const fileName = fileNameWithExt.split('.')[0];
    let outputPath;
    let commandSet = {
        compileCommand: null,
        runCommand: null,
        cleanupDirs: [fileDir],
        cleanupExecDirs: [],
    };

    switch (languageExt) {
        case 'java':
            commandSet.compileCommand = `cd "${fileDir}" && javac "${fileNameWithExt}"`;
            commandSet.runCommand = `cd "${fileDir}" && java "${fileName}"`;
            break;
        case 'py':
            commandSet.runCommand = `cd "${fileDir}" && python "${fileNameWithExt}"`;
            break;
        default:  // cpp 
            outputPath = path.join(dirCodes, `${fileName}.out`);
            commandSet.compileCommand = `cd "${fileDir}" && g++ "${fileNameWithExt}" -o "${outputPath}"`;
            commandSet.runCommand = `"${outputPath}"`;
            commandSet.cleanupExecDirs.push(dirCodes);
            break;
    }
    return commandSet;
};

module.exports = { getCommandForASpecificLanguage };
