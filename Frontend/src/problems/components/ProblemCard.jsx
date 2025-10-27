
const ProblemCard = ({ title, difficulty, onClick }) => {
  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "hard":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-400";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`w-full ${getDifficultyColor(
        difficulty
      )} rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-between items-center`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-sm font-medium capitalize">{difficulty}</span>
    </div>
  );
};

export default ProblemCard;
