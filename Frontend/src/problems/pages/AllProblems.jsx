import { useNavigate } from "react-router-dom";

import ProblemCard from '../components/ProblemCard';
const DSAProblems = () => {

    // Use State - Re-rendering is needed here 
    // fetching of problems need to be done here

    const navigate = useNavigate();

    const problems = [
        { id: 1, title: "Two Sum", difficulty: "Easy" },
        { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
        { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard" },
        { id: 4, title: "Valid Parentheses", difficulty: "Easy" },
        { id: 5, title: "Merge Intervals", difficulty: "Medium" },
        { id: 6, title: "Word Ladder", difficulty: "Hard" },
    ];

    const handleCardClick = (problem) => {
        navigate(`/problem/${problem.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto">
                {problems.map((problem) => (
                    <ProblemCard
                        key={problem.id}
                        title={problem.title}
                        difficulty={problem.difficulty}
                        onClick={() => handleCardClick(problem)}
                    />
                ))}
            </div>
        </div>
    );

};

export default DSAProblems;
