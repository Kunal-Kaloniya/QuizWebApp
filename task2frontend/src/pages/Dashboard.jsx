import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Leaderboard from "../components/Leaderboard.jsx";
import { BASE_URL } from "../utils/constant.jsx";

function Dashboard() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/quiz/quiz-history`, {
                    headers: {
                        Authorization: "Player " + localStorage.getItem("token")
                    }
                });
                setHistory(response.data);
            } catch (err) {
                console.error("There was an error fetching the history: ", err.response.data.message);
            }
        }

        fetchHistory();
    }, [])

    return (
        <div className="font-mono min-h-[90vh] pt-5 transition-all dark:bg-[#0A192F] dark:text-[#CCD6F6] bg-gray-50">
            <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-6 px-4 sm:px-6 md:px-8">

                {/* Profile / User Summary */}
                <div className="flex flex-col items-center w-full lg:w-1/3 rounded-xl bg-white dark:bg-[#172A45] px-6 sm:px-10 py-8 shadow-md">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#64FFDA] text-[#172A45] flex items-center justify-center font-extrabold text-4xl sm:text-5xl rounded-full my-4">
                        {user?.username[0].toUpperCase()}
                    </div>
                    <h1 className="mt-2 text-xl sm:text-2xl font-extrabold break-all text-center text-gray-900 dark:text-[#CCD6F6]">
                        {user?.username}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base text-center">
                        Total tests attempted: <span className="font-bold">{history?.length}</span>
                    </p>
                    <button
                        className="mt-6 w-full sm:w-auto bg-[#64FFDA] hover:bg-[#96FFE8] text-[#172A45] font-semibold py-2 px-6 rounded-lg transition-all"
                        onClick={() => navigate('/quiz-select')}
                    >
                        Take a Quiz
                    </button>
                </div>

                {/* Leaderboard */}
                <div className="w-full lg:w-2/3 bg-white dark:bg-[#172A45] rounded-xl shadow-lg p-4 sm:p-6">
                    <Leaderboard />
                </div>
            </section>

            {/* QUIZ HISTORY SECTION */}
            <section className="max-w-7xl mx-auto text-center mt-10 p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2 text-gray-900 dark:text-[#CCD6F6]">
                    Quiz History
                </h1>

                {history && history.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {history.map((q, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 dark:bg-[#172A45] rounded-lg p-4 sm:p-5 shadow-md hover:shadow-xl transition-all"
                            >
                                <h3 className="text-lg font-semibold mb-2 break-words text-gray-900 dark:text-[#CCD6F6]">{q.quizMeta.category} Test</h3>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-[#CCD6F6]">Score: <span className="font-bold">{q.score}</span> / 10</p>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-[#CCD6F6]">Questions Attempted: {q.questionsAttempted}</p>
                                <p className="text-sm sm:text-base text-red-500">
                                    Incorrect: {q.questionsAttempted - q.score}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        You have not attempted any quiz yet.
                    </p>
                )}
            </section>
        </div>
    );
}

export default Dashboard;