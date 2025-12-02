const SubmissionDetails = ({ submissions }) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Submissions</h1>

            <div className="overflow-x-auto shadow rounded-xl">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-4 font-semibold border">User Name</th>
                            <th className="p-4 font-semibold border">Problem Title</th>
                            <th className="p-4 font-semibold border">Verdict</th>
                            <th className="p-4 font-semibold border">Runtime (ms)</th>
                            <th className="p-4 font-semibold border">Language</th>
                            <th className="p-4 font-semibold border">Submitted Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-gray-500">
                                    No submissions found
                                </td>
                            </tr>
                        ) : (
                            submissions.map((sub, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="p-4 border">{sub.userName}</td>
                                    <td className="p-4 border">{sub.problemTitle}</td>
                                    <td
                                        className={`p-4 border font-semibold ${sub.verdict === "Accepted"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {sub.verdict}
                                    </td>
                                    <td className="p-4 border">{sub.runtime}</td>
                                    <td className="p-4 border">{sub.language}</td>
                                    <td className="p-4 border">{new Date(sub.submittedTime).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubmissionDetails;