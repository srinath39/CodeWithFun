import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProblemDetails from '../components/ProblemDetails';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import TabSection from '../components/TabSection';

const ProblemPage = () => {
    const problemId = useParams().problemId;
    const [availableLanguages, setAvailableLanguages] = useState(null);
    const [selectedLangExt, setSelectedLangExt] = useState("cpp");
    const [currentProblem, setCurrentProblem] = useState(null);
    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [verdict, setVerdict] = useState(null);
    const [activeTab, setActiveTab] = useState("input");

    // useEffect for fetching Problem by ID 
    useEffect(() => {  // this will be running twice , as we are in Strict Mode ( Development)
        const fetchProblembyId = async () => {
            console.log(`http://localhost:3000/problem/${problemId}`);
            try {
                const response = await fetch(
                    `http://localhost:3000/problem/${problemId}`
                );
                const dataFetched = await response.json();
                if (!response.ok) {
                    throw new Error(dataFetched.message | "problem cannot be fetched");
                }
                const loadedProblem = dataFetched.codingProblem;
                // update the state 
                setCurrentProblem(loadedProblem);
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            }
        };
        fetchProblembyId();
    }, []);


    // useEffect for fetching Langauges from the backend 
    useEffect(() => {  // this will be running twice , as we are in Strict Mode ( Development)
        const fetchAllLanguages = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/languages/all'
                );
                const dataFetched = await response.json();
                if (!response.ok) {
                    throw new Error(dataFetched.message | "langauges cannot be fetched");
                }
                const loadedLanguages = dataFetched.lang;
                // update the state 
                setAvailableLanguages(loadedLanguages);
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            }
        };
        fetchAllLanguages();
    }, []);


    // async handler for running the code 
    const handleRunCodeInCompiler = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/code/run', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    languageExt: selectedLangExt,
                    code,
                    input
                })
            }
            );
            const dataFetched = await response.json();
            if (!response.ok) {
                throw new Error(dataFetched.message | "unable to run the code");
            }
            const CodeOutput = dataFetched.CodeOutput;
            console.log(CodeOutput);
            // update the state 
            setActiveTab("output");
            setOutput(CodeOutput);
        } catch (err) {
            // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
            console.log(err.message);
        }
    }

    // async handler for submitting the code 
    const handleSubmitCodeInCompiler = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/code/${problemId}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    languageExt: selectedLangExt,
                    code
                })
            }
            );
            const dataFetched = await response.json();
            if (!response.ok) {
                throw new Error(dataFetched.message | "unable to submit the code");
            }
            // update the state 
            setActiveTab("verdict");
            setVerdict(dataFetched);
        } catch (err) {
            // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
            console.log(err.message);
        }
    }



    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 grow">
                <ProblemDetails problem={currentProblem} />
                <div className="flex flex-col">
                    <LanguageSelector selectedLangExt={selectedLangExt} availableLanguages={availableLanguages} setSelectedLangExt={setSelectedLangExt} />
                    <CodeEditor code={code} setCode={setCode} />
                    <TabSection
                        input={input}
                        setInput={setInput}
                        output={output}
                        verdict={verdict}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleRunCodeInCompiler}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                        >
                            Run
                        </button>
                        <button
                            onClick={handleSubmitCodeInCompiler}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
