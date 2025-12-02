import DifficultyLevel from '../../shared/Utils/DifficultyLevelHelper'
import { Link } from 'react-router-dom';
import SubmissionType from "../../shared/Utils/SubmissionTypeHelper";


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
            <div className="flex gap-3 mb-6">
                <Link
                    to={`/submissions/${SubmissionType.ALL_MY_PROBLEM_SUBMISSIONS}/${problem.id}`}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    My Submissions
                </Link>

                <Link
                    to={`/submissions/${SubmissionType.ALL_PROBLEM_SUBMISSIONS}/${problem.id}`}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                >
                    All Submissions
                </Link>
            </div>
            <p className="text-sm text-gray-600 mb-4">
                Difficulty:{" "}
                <span
                    className={`font - semibold ${DifficultyLevel(problem.difficult) === "Easy"
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
