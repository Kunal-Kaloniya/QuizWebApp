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
                const response = await axios.get(`${BASE_URL}/api/quiz/categories`);

                setCategories(response.data);

            } catch (err) {
                console.error("There was some error fetching categories: ", err)
            }
        }

        const getDifficultyLevels = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/quiz/difficulties`);

                setDifficulties(response.data);

            } catch (err) {
                console.error("There was some error fetching quiz difficulty levels: ", err)
            }
        }

        getDifficultyLevels();
        getCategories();
    }, [])

    const handleClick = async () => {
        if (!category || !difficulty) {
            toast.warn("Please select both category and difficulty!");
            return;
        }

        navigate("/quiz", { state: { category, difficulty } });
    }

    return (
        <div className="transition-all bg-white text-black dark:bg-gray-700 dark:text-white min-h-[90vh]">
            <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">

                {/* Hero Section */}
                <header className="text-center w-full py-8 dark:text-white">
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
                        className="w-full lg:w-1/3 py-5 px-6 sm:px-8 rounded-xl bg-gray-200 dark:bg-gray-800 shadow-md"
                    >
                        <h1 className="text-left mb-4 underline text-xl sm:text-2xl text-red-400 font-bold">
                            Instructions
                        </h1>
                        <ol className="text-base sm:text-lg space-y-2">
                            {instructionList.length > 0 &&
                                instructionList.map((ins) => (
                                    <li key={ins.id} className={`${ins?.color ? "text-red-800" : ""}`}>
                                        {ins.id}. {ins.i}
                                    </li>
                                ))}
                        </ol>
                    </aside>

                    {/* Category + Difficulty Selection */}
                    <section className="w-full lg:w-2/3 py-5 px-6 sm:px-10 rounded-xl bg-gray-200 dark:bg-gray-800 shadow-md">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center lg:text-left">
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
                                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                                : "border-transparent bg-gray-100 dark:bg-gray-700 hover:border-blue-300"}
                                            `}
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold">{cat}</h3>
                                        <p className="text-sm text-gray-500">Click to select</p>
                                    </div>
                                ))}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold my-6 text-center lg:text-left">
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
                                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                                : "border-transparent bg-gray-100 dark:bg-gray-700 hover:border-blue-300"}
                                            `}
                                    >
                                        <h3 className="text-lg sm:text-xl font-semibold">{d}</h3>
                                        <p className="text-sm text-gray-500">Click to select</p>
                                    </div>
                                ))}
                        </div>

                        <div className="p-6 flex justify-center">
                            <button
                                onClick={handleClick}
                                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold text-base sm:text-lg hover:bg-blue-600 transition-all w-full sm:w-auto"
                            >
                                Start Test
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    );
}

export default QuizSelect;