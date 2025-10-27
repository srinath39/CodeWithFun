
const ProblemDetails = ({ problem }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{problem.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
                Difficulty:{" "}
                <span
                    className={`font-semibold ${problem.difficulty === "Easy"
                        ? "text-green-600"
                        : problem.difficulty === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                >
                    {problem.difficulty}
                </span>
            </p>

            <p className="text-gray-700 mb-4">{problem.description}</p>

            <div>
                <h3 className="font-semibold text-gray-800 mb-1">Sample Test Cases:</h3>
                {problem.samples.map((s, i) => (
                    <div key={i} className="bg-gray-100 rounded-lg p-3 mb-2">
                        <p>
                            <strong>Input {i + 1}:</strong> {s.input}
                        </p>
                        <p>
                            <strong>Output {i + 1}:</strong> {s.output}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemDetails;
