
const CodeEditor = ({ code, setCode }) => {
    return (
        <textarea
            className="w-full h-70 border border-gray-300 rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here..."
        />
    );
};

export default CodeEditor;
