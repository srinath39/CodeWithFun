import { useState } from "react";
import ProblemDetails from '../components/ProblemDetails';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import TabSection from '../components/TabSection';

const ProblemPage = () => {
    const [selectedLang, setSelectedLang] = useState("C++");
    const [code, setCode] = useState("");

    const problem = {
        title: "Two Sum",
        difficulty: "Easy",
        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        samples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 grow">
                <ProblemDetails problem={problem} />
                <div className="flex flex-col">
                    <LanguageSelector selected={selectedLang} setSelected={setSelectedLang} />
                    <CodeEditor code={code} setCode={setCode} />
                    <TabSection />
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
