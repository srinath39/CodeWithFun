import ReactMarkdown from 'react-markdown';

const AiReviewTab = ({ content }) => {
  if (!content) return <div className="p-10 text-center text-gray-400">Click "AI Review" to get feedback on your code.</div>;

  // Check if content has error status
  const isError = content.status && content.status >= 400;
  const reviewText = typeof content === 'string' ? content : content.content;

  if (isError) {
    return (
      <div className="p-6 max-h-[500px] overflow-y-auto bg-red-50 border-l-4 border-red-400">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-700 mb-1">Error</h3>
            <p className="text-red-600 text-sm mb-3">{getAiReviewErrorMessage(content.status)}</p>
            <pre className="text-red-700 text-sm whitespace-pre-wrap break-words bg-red-100 p-3 rounded">{reviewText}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-h-[500px] overflow-y-auto bg-white">
      <ReactMarkdown
        components={{
          h2: ({ children }) => <h2 className="text-xl font-bold text-purple-700 mt-4 mb-2 border-b pb-1">{children}</h2>,
          p: ({ children }) => <p className="text-gray-700 mb-3 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-5 mb-4 space-y-1 text-gray-700">{children}</ul>,
          code: ({ children }) => <code className="bg-gray-100 text-pink-600 px-1 rounded font-mono text-sm">{children}</code>,
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-blue-100 p-4 rounded-lg my-3 overflow-x-auto text-xs font-mono shadow-md">
              {children}
            </pre>
          ),
          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
        }}
      >
        {reviewText}
      </ReactMarkdown>
    </div>
  );
};

const getAiReviewErrorMessage = (statusCode) => {
  const errorMessages = {
    400: 'Bad Request - Invalid code or description',
    401: 'Unauthorized - Please log in',
    403: 'Forbidden - You do not have permission',
    408: 'Request Timeout - AI review took too long',
    429: 'Rate Limited - Please wait before requesting another review',
    500: 'Server Error - Failed to generate AI review',
    502: 'Bad Gateway - Service temporarily unavailable',
    503: 'Service Unavailable - AI service is down',
  };
  return errorMessages[statusCode] || 'Failed to generate AI review. Please try again.';
};

export default AiReviewTab;