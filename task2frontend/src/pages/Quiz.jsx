import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant.jsx";
import Loader from "../components/Loader.jsx";

function Quiz() {

    const location = useLocation();
    const navigate = useNavigate();

    const { category, difficulty } = location.state;
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);                  // 3 minutes
    const [isLoading, setIsLoading] = useState(false);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const getQuestions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/quiz/questions`, {
                params: {
                    category: category,
                    difficulty: difficulty,
                },
                headers: {
                    Authorization: `Player ${localStorage.getItem("token")}`,
                }
            });

            setQuestions(response.data);
        } catch (err) {
            console.error("There was some error fetching the questions: ", err.response.data.message);
        }
    }

    // fetch all the quiz questions on component render
    useEffect(() => {
        getQuestions();
    }, []);

    /**
     * Handles quiz time
     * (When the quiz timer runs out it automatically submits the quiz answers)
     */
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handlePrevious = () => {
        if (currentQuestion === 0) {
            return;
        }

        setCurrentQuestion(prev => prev - 1);
    }

    const handleNext = () => {
        if (currentQuestion === questions.length - 1) {
            return;
        }

        setCurrentQuestion(prev => prev + 1);
    }

    const handleChange = (quesId, answer) => {
        setSelectedAnswers(prev => ({ ...prev, [quesId]: answer }));
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/api/quiz/result`, {
                answers: selectedAnswers,
                category: category,
                difficulty: difficulty
            }, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            navigate("/result", { state: { result: response.data.score, questions: questions, selectedAnswers: selectedAnswers } });
        } catch (err) {
            console.error("There was an error fetching results: ", err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="font-mono relative bg-white text-black dark:bg-[#0A192F] dark:text-[#CCD6F6] transition-all min-h-[90vh]">
            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <nav className="w-full md:w-[20vw] px-4 py-6 bg-gray-300 text-black dark:text-[#CCD6F6] dark:bg-[#172A45] transition-all">
                    <h2 className="text-center mb-4 font-semibold text-lg border-b pb-2">Quiz Stats</h2>

                    <div className="space-y-3 mb-6">
                        <div className="p-3 text-center bg-white dark:bg-[#0A192F] rounded shadow font-medium">
                            Total Questions: <span className="font-bold">{questions.length}</span>
                        </div>
                        <div className="p-3 text-center bg-white dark:bg-[#0A192F] rounded shadow font-medium">
                            Attempted: <span className="font-bold">{Object.keys(selectedAnswers).length}</span>
                        </div>
                        <div className="p-3 text-center bg-white dark:bg-[#0A192F] rounded shadow font-medium">
                            Remaining:{" "}
                            <span className="font-bold">
                                {questions.length - Object.keys(selectedAnswers).length}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-center mb-2 font-semibold text-lg border-b pb-2">Your Answers</h2>
                    <div
                        id="selected-answers"
                        className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-5 gap-2 py-4 px-2 mb-5 rounded text-center bg-white dark:bg-[#0A192F] text-black shadow-2xl"
                    >
                        {questions.length !== 0 &&
                            questions.map((q, index) => (
                                <div
                                    key={index}
                                    className={`py-2 rounded-md text-sm bg-gray-400 dark:bg-gray-700 dark:text-[#CCD6F6] transition-colors
                                        ${selectedAnswers[q._id] && "bg-teal-400 dark:bg-teal-400 dark:text-black"}
                                        `}
                                >
                                    {index + 1}
                                </div>
                            ))}
                    </div>

                    <h2
                        className={`${timeLeft <= 30 && "text-red-500"
                            } mt-6 p-3 text-center font-bold text-lg rounded bg-white dark:bg-[#0A192F] shadow`}
                    >
                        Time Left: {formatTime(timeLeft)}
                    </h2>
                </nav>

                {/* Main Quiz Area */}
                <div
                    id="main"
                    className="w-full md:w-[80vw] min-h-[90vh] bg-gray-200 text-black dark:bg-[#0A192F] dark:text-[#CCD6F6] py-6 px-6 sm:px-10 relative transition-all"
                >
                    {questions.length > 0 && (
                        <div>
                            <h2 className="text-center text-2xl sm:text-3xl font-bold italic mb-6">
                                Question {currentQuestion + 1}
                            </h2>

                            <h2 className="text-lg sm:text-2xl font-bold mt-4">
                                {questions[currentQuestion].question}
                            </h2>

                            <div id="options" className="mt-6 space-y-3">
                                {questions[currentQuestion].options.map((option, index) => {
                                    const optionId = `${questions[currentQuestion]._id}-${index}`;
                                    return (
                                        <label
                                            key={optionId}
                                            htmlFor={optionId}
                                            className={`block border rounded-lg px-4 py-3 cursor-pointer transition text-sm sm:text-base ${selectedAnswers[questions[currentQuestion]._id] === option
                                                ? "bg-[#64FFDA] dark:bg-[#64FFDA] text-black dark:text-black"
                                                : "bg-white dark:bg-[#172A45] hover:bg-gray-100 dark:hover:bg-[#2A3B58]"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                id={optionId}
                                                name={`question-${questions[currentQuestion]._id}`}
                                                value={option}
                                                onChange={() => handleChange(questions[currentQuestion]._id, option)}
                                                checked={selectedAnswers[questions[currentQuestion]._id] === option}
                                                className="hidden"
                                            />
                                            {option}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <footer className="absolute bottom-0 left-0 right-0 bg-gray-300 text-black dark:bg-[#172A45] dark:text-[#CCD6F6] px-4 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex gap-4 sm:gap-6">
                            <button
                                className="bg-[#CCD6F6] hover:bg-gray-400 text-[#172A45] px-6 py-2 rounded shadow text-sm sm:text-base"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-[#64FFDA] hover:bg-[#96FFE8] text-[#172A45] px-6 py-2 rounded shadow text-sm sm:text-base"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>

                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow text-sm sm:text-base"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </footer>
                </div>
            </div>

            {isLoading && (
                <Loader message="Getting your results ..." />
            )}
        </div>
    );
}

export default Quiz;