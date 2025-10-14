import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constant.jsx";

function QuizSelect() {

    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState([]);

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const instructionList = [
        { id: 1, i: "Read all questions carefully before answering." },
        { id: 2, i: "It is advised not to use unfair means." },
        { id: 3, i: "Manage your time wisely. The total duration of the quiz is 10 minutes.", color: true },
        { id: 4, i: "There is 1 mark for every correct answer." },
        { id: 5, i: "Review your answers if time permits before submission." },
        { id: 6, i: "Before starting the test make sure you have stable internet connection. In case the page reloads, your test will be cancelled.", color: true },
    ]

    const navigate = useNavigate();

    useEffect(() => {

        const getCategories = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/api/quiz/categories`, {
                    headers: {
                        Authorization: `Player ${token}`
                    }
                });

                setCategories(response.data.categories);

            } catch (err) {
                console.error("There was some error fetching categories: ", err.response.data.message);
            }
        }

        const getDifficultyLevels = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BASE_URL}/api/quiz/difficulties`, {
                    headers: {
                        Authorization: `Player ${token}`
                    }
                });

                setDifficulties(response.data.difficulties);

            } catch (err) {
                console.error("There was some error fetching quiz difficulty levels: ", err.response.data.message);
            }
        }

        getDifficultyLevels();
        getCategories();
    }, [])

    const handleStartQuiz = async () => {
        if (!category || !difficulty) {
            toast.warn("Please select both category and difficulty!");
            return;
        }

        navigate("/quiz", { state: { category, difficulty } });
    }

    return (
        <div className="transition-all bg-white text-black dark:bg-[#0A192F] dark:text-[#CCD6F6] min-h-[90vh]">
            <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">

                {/* Hero Section */}
                <header className="text-center w-full py-8 dark:text-[#CCD6F6]">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Welcome, {user?.username}!
                    </h1>
                    <p className="mt-2 text-base sm:text-lg">
                        Pick a category and show what you’ve got.
                    </p>
                </header>

                {/* Main Section */}
                <main className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-6">

                    {/* Sidebar / Instructions */}
                    <aside
                        id="navBar"
                        className="w-full lg:w-1/3 py-5 px-6 sm:px-8 rounded-xl bg-gray-200 dark:bg-[#172A45] shadow-md"
                    >
                        <h1 className="text-left mb-4 underline text-xl sm:text-2xl text-red-400 dark:text-[#64FFDA] font-bold">
                            Instructions
                        </h1>
                        <ol className="text-base sm:text-lg space-y-2 text-gray-700 dark:text-gray-400">
                            {instructionList.length > 0 &&
                                instructionList.map((ins) => (
                                    <li key={ins.id} className={`${ins?.color ? "text-red-800 dark:text-red-400" : ""}`}>
                                        {ins.id}. {ins.i}
                                    </li>
                                ))}
                        </ol>
                    </aside>

                    {/* Category + Difficulty Selection */}
                    <section className="w-full lg:w-2/3 py-5 px-6 sm:px-10 rounded-xl bg-gray-200 dark:bg-[#172A45] shadow-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center lg:text-left text-gray-900 dark:text-[#CCD6F6]">
                            Choose a Test Subject
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.length > 0 &&
                                categories.map((cat, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCategory(cat)}
                                        className={`cursor-pointer p-4 sm:p-6 rounded-lg shadow-md border-2 transition-all text-center
                                    ${category === cat
                                                ? "border-[#64FFDA] bg-gray-200 dark:bg-[#172A45] text-gray-900 dark:text-[#64FFDA]"
                                                : "border-transparent bg-gray-100 dark:bg-[#0A192F] hover:border-[#64FFDA]"}
                                `}
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold">{cat}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Click to select</p>
                                    </div>
                                ))}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold my-6 text-center lg:text-left text-gray-900 dark:text-[#CCD6F6]">
                            Choose a Test Difficulty
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {difficulties.length > 0 &&
                                difficulties.map((d, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setDifficulty(d)}
                                        className={`cursor-pointer p-4 sm:p-6 rounded-lg shadow-md border-2 transition-all text-center
                                    ${difficulty === d
                                                ? "border-[#64FFDA] bg-gray-200 dark:bg-[#172A45] text-gray-900 dark:text-[#64FFDA]"
                                                : "border-transparent bg-gray-100 dark:bg-[#0A192F] hover:border-[#64FFDA]"}
                                `}
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold">{d}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Click to select</p>
                                    </div>
                                ))}
                        </div>

                        <div className="p-6 flex justify-center">
                            <button
                                onClick={handleStartQuiz}
                                className="px-6 py-3 bg-[#64FFDA] text-[#172A45] rounded-full font-bold text-base sm:text-lg hover:bg-[#96FFE8] transition-all w-full sm:w-auto"
                            >
                                Start Quiz
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default QuizSelect;