const EASY_LEVEL = 0;
const MEDIUM_LEVEL = 1;       
const HARD_LEVEL = 2;

const ProblemCard = (props) => {
  const { title, difficult } = props.problemData;
  let problemLevel='Easy';


  const goIntoProblemHandler=()=>{
      props.onClick(props.problemData)
  }


  const getDifficultyColor = (level) => {
    switch (level) {
      case EASY_LEVEL:
        problemLevel='Easy';
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      case MEDIUM_LEVEL:
        problemLevel='Medium';
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case HARD_LEVEL:
        problemLevel='Hard';
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-400";
    }
  };

  return (
    <div
      onClick={goIntoProblemHandler}
      className={`w-full ${getDifficultyColor(
        difficult
      )} rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex justify-between items-center`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className="text-sm font-medium capitalize">{problemLevel}</span>
    </div>
  );
};

export default ProblemCard;
