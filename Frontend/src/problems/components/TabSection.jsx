import React, { useState } from "react";
import InputTab from "./InputTab";
import OutputTab from "./OutputTab";
import VerdictTab from "./VerdictTab";
import AiReviewTab from "../../shared/components/Review/AiReviewTab";

const TabsSection = ({ input, setInput, output, verdict, activeTab, setActiveTab, aiReview, isLoadingOutput, isLoadingVerdict, isLoadingAiReview }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "input":
                return <InputTab input={input} setInput={setInput} />;
            case "output":
                return isLoadingOutput ? (
                    <div className="p-6">
                        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-green-500 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                ) : <OutputTab output={output} />;
            case "verdict":
                return isLoadingVerdict ? (
                    <div className="p-6">
                        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                ) : <VerdictTab verdict={verdict} />;
            case "aiReview":
                return isLoadingAiReview ? (
                    <div className="p-6">
                        <div className="h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
                        </div>
                        <div className="space-y-3">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                ) : <AiReviewTab content={aiReview} />; 
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
