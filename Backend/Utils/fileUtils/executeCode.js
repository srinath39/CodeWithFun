const { exec } = require("child_process");  // its an Api to talk with CMD in local system 
const dotenv = require("dotenv");
dotenv.config();

const executeCode = (input, languageSpecificCommand) => {
    // execute the code
    return new Promise((resolve, reject) => {     // Promise  maintains atamocity , and wraps asynchronus operations in it 
        // exec is an higher order function which is an async operation 
        exec(languageSpecificCommand.replace(process.env.INPUT_PLACEHOLDER, input), (error, stdout, stderr) => {
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

module.exports = { executeCode };