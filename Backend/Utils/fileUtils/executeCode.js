const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");  // its an Api to talk with CMD in local system 


// Automation in creating a Directory for file storage
const dirCodes = path.join(__dirname, 'executableCodeFiles');

// ONly if the directory does'nt exit create it 
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });   // {recursive: "true"}
}

const executeCode = (filePath) => {

    // creating a file name from filePath
    const fileDir=path.dirname(filePath);
    const fileNameWithExt = path.basename(filePath);
    const fileName= fileNameWithExt.split('.')[0];
    const outputPath = path.join(dirCodes,`${fileName}.exe`);

    // execute the code
    return new Promise((resolve, reject) => {
        exec(`cd ${fileDir} && g++ ${fileNameWithExt} -o ${outputPath} && cd ${dirCodes} && ${fileName}.exe`, (error, stdout, stderr) => {
            if (error) {
                reject({ message: "Execution Failed", details: error.message });
            }
            if (stderr) {
                reject(stderr);
            }
            if(stdout){
                resolve(stdout);
            }
        });
    });
};

module.exports = { executeCode };