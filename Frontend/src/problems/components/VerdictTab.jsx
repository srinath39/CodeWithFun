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

    // Check if verdict has error status
    const isError = verdict.status && verdict.status >= 400;

    if (isError) {
        return (
            <div className="w-full h-32 border border-red-300 rounded-lg p-4 bg-red-50 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <h2 className="text-lg font-bold text-red-700">Error Occurred</h2>
                        <p className="text-red-600 text-sm mt-1">{getErrorDescription(verdict.status)}</p>
                        <pre className="text-red-700 text-xs mt-2 whitespace-pre-wrap break-words">{verdict.verdictMsg}</pre>
                    </div>
                </div>
            </div>
        );
    }

    const totalTestcases = verdict.totalTestcases;
    const testCasesPassed = verdict.testCasesPassed;
    const verdictMsg = verdict.verdictMsg;
    const isAccepted = totalTestcases === testCasesPassed;

    return (
        <div className={`w-full h-32 border rounded-lg p-4 flex flex-col justify-center ${
            isAccepted 
                ? 'border-green-300 bg-green-50' 
                : 'border-red-300 bg-red-50'
        }`}>
            <div className="flex items-center gap-3">
                {isAccepted ? (
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                )}
                <div className="flex-1">
                    <h2 className={`text-xl font-bold ${isAccepted ? 'text-green-600' : 'text-red-600'}`}>
                        {isAccepted ? 'Accepted ✓' : 'Wrong Answer ✗'}
                    </h2>
                    <p className={`text-sm ${isAccepted ? 'text-green-600' : 'text-red-600'}`}>
                        {testCasesPassed}/{totalTestcases} test cases passed
                    </p>
                </div>
            </div>
            <p className="text-gray-700 mt-3 text-sm whitespace-pre-line">{verdictMsg}</p>
        </div>
    );
};

const getErrorDescription = (statusCode) => {
    const errorMessages = {
        400: 'Bad Request - Invalid input or code format',
        401: 'Unauthorized - Please log in to submit',
        403: 'Forbidden - You do not have permission to submit',
        404: 'Not Found - Problem not found',
        408: 'Request Timeout - Submission took too long to process',
        413: 'Payload Too Large - Code size exceeds limit',
        429: 'Too Many Requests - Please wait before submitting again',
        500: 'Server Error - Failed to process submission',
        502: 'Bad Gateway - Service temporarily unavailable',
        503: 'Service Unavailable - Please try again later',
    };
    return errorMessages[statusCode] || 'An error occurred while processing your submission';
}

export default VerdictTab;
