import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProblemDetails from '../components/ProblemDetails';
import LanguageSelector from '../components/LanguageSelector';
import CodeEditor from '../components/CodeEditor';
import TabSection from '../components/TabSection';
import axios from "axios";

const ProblemPage = () => {
    const problemId = useParams().problemId;
    const [availableLanguages, setAvailableLanguages] = useState(null);
    const [selectedLangExt, setSelectedLangExt] = useState("cpp");
    const [currentProblem, setCurrentProblem] = useState(null);
    const [code, setCode] = useState(getPlaceholderCode("cpp"));
    const [input, setInput] = useState("");
    const [output, setOutput] = useState({});
    const [verdict, setVerdict] = useState(null);
    const [activeTab, setActiveTab] = useState("input");
    const [aiReview, setAiReview] = useState("");
    const [isLoadingProblem, setIsLoadingProblem] = useState(false);
    const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
    const [isLoadingOutput, setIsLoadingOutput] = useState(false);
    const [isLoadingVerdict, setIsLoadingVerdict] = useState(false);
    const [isLoadingAiReview, setIsLoadingAiReview] = useState(false);

    // Placeholder code templates
    function getPlaceholderCode(languageExt) {
        const templates = {
            java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World");
    }
}`,
            py: `def solve():
    # Write your code here
    print("Hello World")

if __name__ == "__main__":
    solve()`,
            cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    cout << "Hello World" << endl;
    return 0;
}`,
            js: `// Write your code here
console.log("Hello World");`,
            ts: `// Write your code here
console.log("Hello World");`,
            c: `#include <stdio.h>

int main() {
    // Write your code here
    printf("Hello World\\n");
    return 0;
}`,
            html: `<!DOCTYPE html>
<html>
<head>
    <title>Solution</title>
</head>
<body>
    <!-- Write your code here -->
    <h1>Hello World</h1>
</body>
</html>`,
            css: `/* Write your CSS here */
body {
    font-family: Arial, sans-serif;
}`
        };
        return templates[languageExt] || "// Write your code here";
    }

    // useEffect for fetching Problem by ID 
    useEffect(() => {  // this will be running twice , as we are in Strict Mode ( Development)
        const fetchProblembyId = async () => {
            setIsLoadingProblem(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/problem/${problemId}`, {
                    withCredentials: true,
                });

                const dataFetched = response.data;
                const loadedProblem = dataFetched.codingProblem;
                // update the state 
                setCurrentProblem(loadedProblem);
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            } finally {
                setIsLoadingProblem(false);
            }
        };
        fetchProblembyId();
    }, []);


    // useEffect for fetching Langauges from the backend 
    useEffect(() => {  // this will be running twice , as we are in Strict Mode ( Development)
        const fetchAllLanguages = async () => {
            setIsLoadingLanguages(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/languages/all`, {
                    withCredentials: true,
                });
                const dataFetched = response.data;
                const loadedLanguages = dataFetched.lang;
                // update the state 
                setAvailableLanguages(loadedLanguages);
            } catch (err) {
                // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
                console.log(err.message);
            } finally {
                setIsLoadingLanguages(false);
            }
        };
        fetchAllLanguages();
    }, []);


    // useEffect for updating code when language changes
    useEffect(() => {
        setCode(getPlaceholderCode(selectedLangExt));
    }, [selectedLangExt]);


    // async handler for running the code 
    const handleRunCodeInCompiler = async () => {
        setIsLoadingOutput(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BACKEND_URL}/code/run`,
                {
                    languageExt: selectedLangExt,
                    code,
                    input,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            const dataFetched = response.data;

            const CodeOutput = dataFetched.CodeOutput;
            // update the state 
            setActiveTab("output");
            setOutput({result: CodeOutput, status : response.status});
        } catch (err) {
            // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)

            const errorOutput = err.response.data.message;
            setActiveTab("output");
            setOutput({result: errorOutput,status : err.response.status});
        } finally {
            setIsLoadingOutput(false);
        }
    }

    // async handler for submitting the code 
    const handleSubmitCodeInCompiler = async () => {
        setIsLoadingVerdict(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BACKEND_URL}/code/${problemId}/submit`,
                {
                    languageExt: selectedLangExt,
                    code,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            const dataFetched = response.data;

            // update the state 
            setActiveTab("verdict");
            setVerdict({ ...dataFetched, status: response.status });
        } catch (err) {
            // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
            const errorMessage = err.response?.data?.message || err.message || 'Failed to submit code';
            setActiveTab("verdict");
            setVerdict({ verdictMsg: errorMessage, status: err.response?.status || 500, totalTestcases: 0, testCasesPassed: 0 });
        } finally {
            setIsLoadingVerdict(false);
        }
    }

    const handleAiReview = async () => {
        setIsLoadingAiReview(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/review/ai-review`, { code, description: currentProblem.problemDescription },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
            setActiveTab("aiReview");
            setAiReview({ content: response.data.aiReview, status: response.status });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to generate AI review';
            setActiveTab("aiReview");
            setAiReview({ content: errorMessage, status: err.response?.status || 500 });
        } finally {
            setIsLoadingAiReview(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 grow">
                {isLoadingProblem ? (
                    <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                        <div className="space-y-2">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <ProblemDetails problem={currentProblem} />
                )}
                <div className="flex flex-col">
                    <LanguageSelector selectedLangExt={selectedLangExt} availableLanguages={availableLanguages} setSelectedLangExt={setSelectedLangExt} isLoadingLanguages={isLoadingLanguages} />
                    <CodeEditor code={code} setCode={setCode} languageExt={selectedLangExt} />
                    <TabSection
                        input={input}
                        setInput={setInput}
                        output={output}
                        verdict={verdict}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        aiReview={aiReview}
                        isLoadingOutput={isLoadingOutput}
                        isLoadingVerdict={isLoadingVerdict}
                        isLoadingAiReview={isLoadingAiReview}
                    />
                    <div>
                        {(isLoadingOutput || isLoadingVerdict || isLoadingAiReview) && (
                            <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
                            </div>
                        )}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleRunCodeInCompiler}
                                disabled={isLoadingOutput || isLoadingVerdict || isLoadingAiReview}
                                className="bg-gray-800 hover:bg-gray-950 disabled:bg-gray-600 text-white px-7 py-2 rounded-lg transition disabled:cursor-not-allowed"
                            >
                                {isLoadingOutput ? 'Running...' : 'Run'}
                            </button>
                            <button
                                onClick={handleSubmitCodeInCompiler}
                                disabled={isLoadingOutput || isLoadingVerdict || isLoadingAiReview}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-500 text-white px-5 py-2 rounded-lg transition disabled:cursor-not-allowed"
                            >
                                {isLoadingVerdict ? 'Submitting...' : 'Submit'}
                            </button>
                            <button
                                onClick={handleAiReview}
                                disabled={isLoadingOutput || isLoadingVerdict || isLoadingAiReview}
                                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-500 text-white px-5 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoadingAiReview ? 'Reviewing...' : 'AI Review'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
