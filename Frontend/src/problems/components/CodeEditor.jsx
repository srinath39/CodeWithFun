
const CodeEditor = ({ code, setCode }) => {
    return (
        <div className="w-full h-72 bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#333] shadow-lg flex text-sm">
            {/* Line numbers */}
            <div className="bg-[#252526] text-gray-400 px-4 py-3 text-right select-none">
                {code.split("\n").map((_, i) => (
                    <div key={i} className="leading-6">
                        {i + 1}
                    </div>
                ))}
            </div>
            {/* Code area */}
            <textarea
                className="w-full h-full bg-[#1e1e1e] text-gray-100 p-3 font-mono focus:outline-none resize-none leading-6 overflow-auto"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                placeholder="// Write your code here..."
            />
        </div>
    );
};

export default CodeEditor;
