import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { BASE_URL } from "../../utils/constant.jsx";
import Loader from "../../components/Loader.jsx";

export default function DeleteQuestion() {

    const [quesId, setQuesId] = useState("");
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchQuestion = async (id) => {

        if (!id) {
            toast.warn("Please enter the Question Id");
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/api/admin/search-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setQuestion(response.data.question);

            toast.info(response.data.message);
        } catch (err) {
            toast.warn(err.response.data.message || "Network Error! Please try later");
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteQuestion = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`${BASE_URL}/api/admin/delete-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            toast.success(response.data.message);
            setQuesId("");
            setQuestion(null);
        } catch (err) {
            toast.error(err.response.data.message || "Network Error! Please try later");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                Delete a Question
            </h1>

            {/* Search Question By Id */}
            <div className="mb-4">
                <label
                    htmlFor="questionId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Question ID
                </label>
                <input
                    id="questionId"
                    type="text"
                    name="questionId"
                    placeholder="Enter question ID"
                    value={quesId}
                    onChange={(e) => {
                        setQuesId(e.target.value);
                        setQuestion(null);
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            {/* Search Button */}
            <button
                className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleSearchQuestion(quesId)}
                disabled={question ? true : false}
            >
                Search Question
            </button>

            {question && (
                <div
                    key={question._id}
                    className="p-5 my-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                            ID: {question._id}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                {question.category}
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                                {question.difficulty}
                            </span>
                        </div>
                    </div>
                    {/* Question */}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        {question.question}
                    </h2>
                    {/* Options */}
                    <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Options:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
                            {question.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                            ))}
                        </ul>
                    </div>
                    {/* Correct Answer */}
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2">
                        ✅ Correct Answer: {question.correctAnswer}
                    </p>
                    {/* Explanation */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                    </p>
                </div>
            )}

            {/* Delete Question Button */}
            {question && (
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteQuestion(quesId)}
                >
                    Delete Question
                </button>
            )}

            {isLoading && (
                <Loader message="Processing, please wait ..." />
            )}
        </div>

    );
}