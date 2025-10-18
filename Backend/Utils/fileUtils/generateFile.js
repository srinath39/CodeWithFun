const path = require("path");
const fs = require("fs");
const uniqueName = require("uniqid");

// Automation in creating a Directory for file storage
const dirCodes = path.join(__dirname, 'codes');

// ONly if the directory does'nt exit create it 
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });   // {recursive: "true"}
}

const generateFileWithCode = (language, languageExtension, code) => {

    // creating a file name 
    const jobId = uniqueName();
    const fileName = `${jobId}-${language}.${languageExtension}`;

    // file path 
    const codeFilePath = path.join(dirCodes, fileName);

    // create the file and copy the code
    fs.writeFileSync(codeFilePath, code);
    return codeFilePath;
};

module.exports = { generateFileWithCode };