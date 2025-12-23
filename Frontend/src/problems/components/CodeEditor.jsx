import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, languageExt }) => {
    const languageMapForCodeEditor = {
        py: "python",
        js: "javascript",
        ts: "typescript",
        cpp: "cpp",
        c: "c",
        java: "java",
        html: "html",
        css: "css"
    };

    const languageForEditor = (ext) => {
        return languageMapForCodeEditor[ext] || ext;
    };

    return (
        <Editor
            height="300px"
            theme="vs-dark"
            language={languageForEditor(languageExt)}
            value={code}
            onChange={(val) => setCode(val)}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
            }}
        />
    );
};

export default CodeEditor;
