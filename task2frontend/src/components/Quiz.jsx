import axios from "axios";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

function Quiz() {

    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const { category, difficulty } = location.state;
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);                  // 3 minutes

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const getQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/quiz/questions", {
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
            console.error("There was some error fetching the quiz questions: ", err);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

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
            const response = await axios.post(`http://localhost:3000/users/user/result`, {
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
            console.error("There was an error fetching results: ", err);
        }
    }

    return (
        <div className={`font-mono relative mt-[10vh] transition-all ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}>
            <div className="flex">
                <div id="navBar" className={`w-[20vw] h-[90vh] border-r-2 px-4 py-10 transition-all ${theme === "light" ? "bg-gray-300 text-black" : "bg-gray-900"}`}>
                    <h1 className="text-center mb-2 underline text-xl">Quiz Stats:</h1>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 text-black shadow-2xl">Total questions: {questions.length}</h3>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 text-black shadow-2xl">Questions Attempted: {Object.keys(selectedAnswers).length}</h3>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 text-black shadow-2xl">Questions Remaining: {questions.length - Object.keys(selectedAnswers).length}</h3>

                    <h1 className="text-center mt-5 mb-2 underline text-xl">Your Answers:</h1>
                    <div id="selected-answers" className="h-auto border-2 p-2 mb-2 rounded text-center bg-gray-200 text-black shadow-2xl">
                        {
                            questions.length !== 0 && (
                                questions.map((q, idx) => (
                                    <h6 key={idx}>Q{idx + 1} {"->"} {selectedAnswers[q._id] ? selectedAnswers[q._id] : <span>N/A</span>}</h6>
                                ))
                            )
                        }
                    </div>

                    <h1 className={`${timeLeft <= 30 && "text-red-600"} w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 text-black shadow-2xl`}>
                        Time Left: {formatTime(timeLeft)}
                    </h1>
                </div>
                <div id="main" className={`w-[80vw] h-[90vh] ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"} py-5 px-20 relative transition-all`}>
                    {
                        questions.length !== 0 && (
                            <div className="">
                                <h1 className="text-center text-3xl font-extrabold italic">Question {currentQuestion + 1}</h1>
                                <h2 className="text-2xl mt-10 font-bold">Q. {questions[currentQuestion].question}</h2>
                                <div id="options" className="my-5">
                                    {
                                        questions[currentQuestion].options.map((option, index) => {
                                            const optionId = `${questions[currentQuestion]._id}-${index}`
                                            return (<div key={index} className="text-xl space-x-3 space-y-8 ">
                                                <input
                                                    type="radio"
                                                    name={`question-${questions[currentQuestion]._id}`}
                                                    value={option}
                                                    id={optionId}
                                                    onChange={() => handleChange(questions[currentQuestion]._id, option)}
                                                    checked={selectedAnswers[questions[currentQuestion]._id] === option}
                                                />
                                                <label htmlFor={optionId}>{option}</label>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                    <div className="absolute bottom-0 left-0 right-0 bg-gray-300 text-black px-10 py-4 border-b-2 flex items-center justify-between">
                        <button className="bg-blue-400 text-xl rounded px-3 py-1 border-2 border-blue-400 hover:shadow-2xl hover:border-black transition-all" onClick={handlePrevious}>Previous</button>
                        <button className="bg-white text-xl rounded px-3 py-1 border-2 border-white hover:shadow-2xl hover:border-black transition-all" onClick={handleSubmit}>Submit</button>
                        <button className="bg-green-400 text-xl rounded px-3 py-1 border-2 border-green-400 hover:shadow-2xl hover:border-black transition-all" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;