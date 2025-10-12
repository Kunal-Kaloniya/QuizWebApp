import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constant.jsx";
import Loader from "../../components/Loader.jsx";

export default function UpdateQuestion() {

    const [form, setForm] = useState({
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
        "category": "",
        "difficulty": "",
        "explanation": ""
    });
    const [quesId, setQuesId] = useState("");
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (index, value) => {
        let updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const handleSearchQuestion = async (id) => {
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

    const handleUpdateQuestion = async (e, id) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await axios.put(`${BASE_URL}/api/admin/update-question/${id}`, form, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            toast.success(response.data.message);
            setForm({
                "question": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "difficulty": "",
                "explanation": ""
            })

            setQuesId("");
            setQuestion(null);
        } catch (err) {
            toast.error(err.response.data.message || "Network Error! Please try later");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-5">
            <div className="bg-white dark:bg-[#172A45] shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-[#CCD6F6]">
                    Update a Question
                </h1>

                {/* Search Question By Id */}
                <div className="flex gap-3 mb-6 flex-col md:flex-row">
                    <input
                        type="text"
                        name="questionId"
                        placeholder="Enter Question ID"
                        value={quesId}
                        onChange={(e) => {
                            setQuesId(e.target.value);
                            setQuestion(null);
                        }}
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        disabled={question ? true : false}
                    />
                    <button
                        type="button"
                        onClick={() => handleSearchQuestion(quesId)}
                        className="bg-[#64FFDA] hover:bg-[#96FFE8] text-[#172A45] font-medium px-5 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#64FFDA]"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Found Question */}
            {question && (
                <div
                    key={question._id}
                    className="p-5 border border-gray-200 dark:border-[#172A45] rounded-lg bg-gray-50 dark:bg-[#0A192F] shadow-sm hover:shadow-md transition-shadow"
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
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-[#CCD6F6] mb-2">
                        {question.question}
                    </h2>
                    {/* Options */}
                    <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-[#CCD6F6]">
                            Options:
                        </p>
                        <ul className="list-disc pl-6 text-gray-800 dark:text-[#CCD6F6]">
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

            {/* Updated Fields */}
            {question && (
                <form
                    className="space-y-5 bg-white dark:bg-[#172A45] shadow-md rounded-lg p-6"
                    onSubmit={(e) => handleUpdateQuestion(e, quesId)}
                >
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-[#CCD6F6]">Updated Fields</h3>
                    {/* Question */}
                    <div>
                        <label
                            htmlFor="question"
                            className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-1"
                        >
                            Question
                        </label>
                        <input
                            id="question"
                            type="text"
                            name="question"
                            value={form.question}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        />
                    </div>

                    {/* Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-2">
                            Options
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {form.options.map((opt, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Correct Answer */}
                    <div>
                        <label
                            htmlFor="correctAnswer"
                            className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-1"
                        >
                            Correct Answer
                        </label>
                        <input
                            id="correctAnswer"
                            type="text"
                            name="correctAnswer"
                            value={form.correctAnswer}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-1"
                        >
                            Category
                        </label>
                        <input
                            id="category"
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        />
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label
                            htmlFor="difficulty"
                            className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-1"
                        >
                            Difficulty
                        </label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        >
                            <option defaultChecked value="" disabled hidden>-- select --</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    {/* Explanation */}
                    <div>
                        <label
                            htmlFor="explanation"
                            className="block text-sm font-medium text-gray-700 dark:text-[#CCD6F6] mb-1"
                        >
                            Explanation
                        </label>
                        <textarea
                            id="explanation"
                            name="explanation"
                            value={form.explanation}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-[#0A192F] text-gray-900 dark:text-[#CCD6F6] focus:ring-2 focus:ring-[#64FFDA] outline-none"
                        />
                    </div>

                    {/* Update Question Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Update Question
                        </button>
                    </div>
                </form>
            )}

            {isLoading && (
                <Loader message="Processing, please wait ..." />
            )}
        </div>
    );
}