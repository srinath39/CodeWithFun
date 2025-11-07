const InputTab = ({ input, setInput }) => {
    return (
        <textarea
            className="w-full h-32 border border-gray-300 rounded-lg p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Custom Input..."
        />
    );
};

export default InputTab;