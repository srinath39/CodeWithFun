const { exec, execSync } = require("child_process");  // its an Api to talk with CMD in local system 
const dotenv = require("dotenv");
dotenv.config();

const isPythonCompileError = (stderr) => /SyntaxError|IndentationError|TabError|NameError|ImportError/.test(stderr);
const TIME_LIMIT_MS = 10000; // 10 seconds  for npow later change it based on language and problem constraints

const executeShellCommand = (command, input) => {

    return new Promise((resolve, reject) => {
        const childOptions = { shell: true, timeout: TIME_LIMIT_MS };
        const child = exec(command, childOptions, (error, stdout, stderr) => {
            const out = stdout ? stdout.toString() : "";
            const err = stderr ? stderr.toString() : "";
            if (error) {
                if (error.killed && error.signal === 'SIGTERM') {
                    return reject({
                        type: 'TIME_LIMIT_EXCEEDED',
                        stderr: `Program exceeded ${TIME_LIMIT_MS} ms`,
                    });
                }
                return reject({ error, stdout: out, stderr: err });
            }
            return resolve({ stdout: out, stderr: err });
        });

        if (typeof input === 'string') {
            child.stdin.write(input);
        }
        child.stdin.end();
    });
};

const executeCode = async (input, languageSpecificCommands, languageExt) => {
    if (!languageSpecificCommands || typeof languageSpecificCommands.runCommand !== 'string') {
        throw {
            type: 'SYSTEM_ERROR',
            message: 'Execution command is invalid',
            errorCode: 500,
        };
    }


    if (languageSpecificCommands.compileCommand) {
        try {
            await executeShellCommand(languageSpecificCommands.compileCommand, null);
        } catch (compileError) {
            const stderr = compileError.stderr || '';
            throw {
                type: compileError.type == 'TIME_LIMIT_EXCEEDED' ? 'TIME_LIMIT_EXCEEDED' : 'COMPILATION_ERROR',
                message: stderr.trim() || compileError.error.message || 'Compilation failed',
                errorOutput: stderr,
                errorCode: 400,
            };
        }
    }

    try {
        const { stdout, stderr } = await executeShellCommand(languageSpecificCommands.runCommand, input || '');
        return stdout;
    } catch (runError) {
        const stderr = runError.stderr || '';
        const errorType =  runError.type == 'TIME_LIMIT_EXCEEDED' ? 'TIME_LIMIT_EXCEEDED' : languageExt === 'py' && isPythonCompileError(stderr)
            ? 'COMPILATION_ERROR'
            : 'RUNTIME_ERROR';
        throw {
            type: errorType,
            message: stderr.trim() || runError.error.message || 'Runtime failed',
            errorOutput: stderr,
            errorCode: 400,
        };
    }
};

module.exports = { executeCode };