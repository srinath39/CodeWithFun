const OutputTab = ({ output }) => {
    return (
        <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50 overflow-y-auto">
            {output ? output : "Output will appear here..."}
        </div>
    );
};

export default OutputTab;