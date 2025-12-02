const SubmissionDetails = ({ submissions }) => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full max-w-6xl">

                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                    My Submissions
                </h1>

                <div className="overflow-x-auto shadow-xl rounded-xl bg-white">
                    <table className="min-w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="p-4 font-semibold border border-gray-300">User Name</th>
                                <th className="p-4 font-semibold border border-gray-300">Problem Title</th>
                                <th className="p-4 font-semibold border border-gray-300">Verdict</th>
                                <th className="p-4 font-semibold border border-gray-300">Runtime (ms)</th>
                                <th className="p-4 font-semibold border border-gray-300">Language</th>
                                <th className="p-4 font-semibold border border-gray-300">Submitted Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-500 border border-gray-300">
                                        No submissions found
                                    </td>
                                </tr>
                            ) : (
                                submissions.map((sub, i) => {
                                    const isAccepted = sub.verdict === "Accepted";

                                    return (
                                        <tr
                                            key={i}
                                            className={`
                                                ${isAccepted ? "bg-green-100" : "bg-red-100"}
                                            `}
                                        >
                                            <td className="p-4 border border-gray-300">{sub.userName}</td>
                                            <td className="p-4 border border-gray-300">{sub.problemTitle}</td>

                                            <td
                                                className={`p-4 border border-gray-300 font-semibold
                                                    ${isAccepted ? "text-green-700" : "text-red-700"}
                                                `}
                                            >
                                                {sub.verdict}
                                            </td>

                                            <td className="p-4 border border-gray-300">{sub.runtime}</td>
                                            <td className="p-4 border border-gray-300">{sub.language}</td>
                                            <td className="p-4 border border-gray-300">
                                                {new Date(sub.submittedTime).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetails;
