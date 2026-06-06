const path = require("path");
const fs = require("fs");
const uniqueName = require("uniqid");

// Automation in creating a Directory for file storage
const dirCodes = path.join(__dirname, 'codes');

// Only if the directory doesn't exist create it
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const getJavaFilename = (code) => {
    const publicClassMatch = code.match(/\bpublic\s+class\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
    if (publicClassMatch) {
        return `${publicClassMatch[1]}.java`;
    }
    const classMatch = code.match(/\bclass\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
    if (classMatch) {
        return `${classMatch[1]}.java`;
    }
    return 'Main.java';
};

const generateFileWithCode = (languageExtension, code) => {

    const jobId = uniqueName();
    const languageDir = path.join(dirCodes, languageExtension);
    // const jobDir = path.join(languageDir, jobId);
    if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir, { recursive: true });
    }

    let fileName = `${jobId}.${languageExtension}`;
    if (languageExtension === 'java') {
        fileName = getJavaFilename(code);
    }

    const codeFilePath = path.join(languageDir, fileName);

    // create the file and copy the code
    fs.writeFileSync(codeFilePath, code);
    return codeFilePath;
};

module.exports = { generateFileWithCode };