import DifficultyLevel from '../../shared/Utils/DifficultyLevelHelper'


const ProblemDetails = ({ problem }) => {
    if (problem == null) {
        return (
            <div>
                <h1>Problem data cannot be fetched</h1>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{problem.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
                Difficulty:{" "}
                <span
                    className={`font-semibold ${DifficultyLevel(problem.difficult) === "Easy"
                        ? "text-green-600"
                        : DifficultyLevel(problem.difficult) === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                >
                    {DifficultyLevel(problem.difficult)}
                </span>
            </p>

            <p className="text-gray-700 mb-4">{problem.problemDescription}</p>

            <div>
                <h3 className="font-semibold text-gray-800 mb-1">Sample Test Cases:</h3>
                {problem.testCases.filter(s => s.isSample).map((s, i) => (     // input as object with index 
                    <div key={i} className="bg-gray-100 rounded-lg p-3 mb-2">
                        <p>
                            <strong>Input {i + 1}:</strong> {s.input}
                        </p>
                        <p>
                            <strong>Output {i + 1}:</strong> {s.expectedOutput}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemDetails;
