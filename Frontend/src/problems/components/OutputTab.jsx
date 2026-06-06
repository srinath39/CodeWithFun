const OutputTab = ({ output }) => {
    if (!output) {
        return (
            <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50 overflow-y-auto">
                Output will appear here...
            </div>
        );
    }

    // Check if output has a status property and if it's an error
    const isError = output.status && output.status >= 400;
    const displayText = typeof output === 'string' ? output : output.result;
    const statusCode = output.status;

    return (
        <div className={`w-full h-32 border rounded-lg p-3 overflow-y-auto ${
            isError 
                ? 'bg-red-50 border-red-300' 
                : 'bg-green-50 border-green-300'
        }`}>
            {isError && (
                <div className="mb-3 flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="font-semibold text-red-800">Error</p>
                        <p className="text-xs text-red-600">{getErrorMessage(statusCode)}</p>
                    </div>
                </div>
            )}
            <pre className={`text-sm font-mono whitespace-pre-wrap break-words ${
                isError 
                    ? 'text-red-700' 
                    : 'text-green-700'
            }`}>
                {displayText || (isError ? 'An error occurred' : 'Output will appear here...')}
            </pre>
        </div>
    );
};

const getErrorMessage = (statusCode) => {
    const errorMessages = {
        400: 'Bad Request - Check your input syntax',
        401: 'Unauthorized - Please log in',
        403: 'Forbidden - You do not have permission',
        404: 'Not Found - Resource not available',
        408: 'Request Timeout - Code took too long to execute',
        413: 'Payload Too Large - Input is too large',
        429: 'Too Many Requests - Rate limit exceeded',
        500: 'Server Error - Internal server error',
        502: 'Bad Gateway - Service temporarily unavailable',
        503: 'Service Unavailable - Server is down',
    };
    return errorMessages[statusCode] || 'An error occurred while processing your code';
};


export default OutputTab;