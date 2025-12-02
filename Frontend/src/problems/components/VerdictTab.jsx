const VerdictTab = ({ verdict }) => {
    if (!verdict) {
        return (
            <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50 flex justify-center items-center">
                <p className="text-gray-500 text-center font-medium">
                    Verdict not available
                </p>
            </div>
        );
    }
    const totalTestcases = verdict.totalTestcases;
    const testCasesPassed = verdict.testCasesPassed;
    const verdictMsg = verdict.verdictMsg;
    const isAccepted = totalTestcases === testCasesPassed;
    return (
        <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50 flex flex-col justify-center items-center">
            <h2
                className={`text-xl font-bold ${isAccepted ? "text-green-600" : "text-red-600"
                    }`}
            >
                {isAccepted ? "Accepted" : "Wrong Answer"}
            </h2>
            <p className="text-gray-700 mt-2 text-center whitespace-pre-line">{verdictMsg}</p>
        </div>
    );
};

export default VerdictTab;
