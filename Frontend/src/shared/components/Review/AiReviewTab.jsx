import ReactMarkdown from 'react-markdown';

const AiReviewTab = ({ content }) => {
  if (!content) return <div className="p-10 text-center text-gray-400">Click "AI Review" to get feedback on your code.</div>;

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
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiReviewTab;