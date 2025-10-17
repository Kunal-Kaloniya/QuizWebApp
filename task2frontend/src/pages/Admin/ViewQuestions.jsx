import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant.jsx";
import Loader from "../../components/Loader.jsx";

const ViewQuestions = () => {

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const testCategories = [
        "Math",
        "Science",
        "Computer"
    ];
    const testDifficulties = [
        "Easy",
        "Medium",
        "Hard"
    ];

    const fetchFilteredQuestions = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/api/admin/all-questions`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                },
                params: {
                    category: category,
                    difficulty: difficulty
                }
            });

            setQuestions(response.data.questions);
        } catch (err) {
            console.error("Failed to fetch questions: ", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white dark:bg-[#172A45] shadow-md rounded-lg p-6">
            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="w-full md:w-auto border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                >
                    <option value="">All Categories</option>
                    {testCategories.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <select
                    onChange={(e) => setDifficulty(e.target.value)}
                    value={difficulty}
                    className="w-full md:w-auto border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                >
                    <option value="">All Difficulties</option>
                    {testDifficulties.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                <button
                    onClick={fetchFilteredQuestions}
                    className="w-full md:w-auto bg-[#64FFDA] hover:bg-[#96FFE8] text-[#172A45] font-semibold px-5 py-2 rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-[#64FFDA] focus:ring-offset-1"
                >
                    Filter
                </button>
            </div>
            {/* Question List */}
            {questions.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center italic">
                    No questions found.
                </p>
            ) : (
                <div className="space-y-5">
                    {questions.map((q) => (
                        <div
                            key={q._id}
                            className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#0A192F] shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                                    ID: {q._id}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs rounded-full bg-[#CCD6F6] text-black dark:bg-[#CCD6F6] dark:text-black">
                                        {q.category}
                                    </span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                        {q.difficulty}
                                    </span>
                                </div>
                            </div>
                            {/* Question */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-[#CCD6F6] mb-2">
                                {q.question}
                            </h2>
                            {/* Options */}
                            <div className="mb-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-[#CCD6F6]">
                                    Options:
                                </p>
                                <ul className="list-disc pl-6 text-gray-800 dark:text-[#CCD6F6]">
                                    {q.options.map((opt, idx) => (
                                        <li key={idx}>{opt}</li>
                                    ))}
                                </ul>
                            </div>
                            {/* Correct Answer */}
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2">
                                ✅ Correct Answer: {q.correctAnswer}
                            </p>
                            {/* Explanation */}
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Explanation:</span> {q.explanation}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {isLoading && (
                <Loader message="Fetching questions, please wait..." />
            )}
        </div>
    );
}

export default ViewQuestions;