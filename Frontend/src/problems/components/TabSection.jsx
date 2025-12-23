import React, { useState } from "react";
import InputTab from "./InputTab";
import OutputTab from "./OutputTab";
import VerdictTab from "./VerdictTab";
import AiReviewTab from "../../shared/components/Review/AiReviewTab";

const TabsSection = ({ input, setInput, output, verdict, activeTab, setActiveTab, aiReview }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "input":
                return <InputTab input={input} setInput={setInput} />;
            case "output":
                return <OutputTab output={output} />;
            case "verdict":
                return <VerdictTab verdict={verdict} />;
            case "aiReview": 
                return <AiReviewTab content={aiReview} />;
            default:
                return null;
        }
    };


    return (
        <div>
            <div className="mt-5 flex gap-2 mb-2">
                {["input", "output", "verdict", "aiReview"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-lg font-medium ${activeTab === tab
                            ? "bg-sky-500 text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {tab === "aiReview" ? "AI Review ✨" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="bg-white p-2 rounded-b-lg shadow-inner mb-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default TabsSection;
