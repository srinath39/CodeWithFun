import React, { useState } from "react";

const TabsSection = () => {
    const [activeTab, setActiveTab] = useState("input");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [verdict, setVerdict] = useState("");

    const renderContent = () => {
        switch (activeTab) {
            case "input":
                return (
                    <textarea
                        className="w-full h-32 border border-gray-300 rounded-lg p-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Custom Input..."
                    />
                );
            case "output":
                return (
                    <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50">
                        {output || "Output will appear here..."}
                    </div>
                );
            case "verdict":
                return (
                    <div className="w-full h-32 border border-gray-300 rounded-lg p-3 bg-gray-50">
                        {verdict || "Verdict: Pending"}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex gap-2 mb-2">
                {["input", "output", "verdict"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-lg font-medium ${activeTab === tab
                            ? "bg-sky-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white p-2 rounded-b-lg shadow-inner mb-4">
                {renderContent()}
            </div>

            <div className="flex justify-end gap-3">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition">
                    Run
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TabsSection;
