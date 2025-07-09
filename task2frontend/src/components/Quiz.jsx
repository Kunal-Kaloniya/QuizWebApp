import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {

    const location = useLocation();
    const navigate = useNavigate();

    const { category, difficulty } = location.state;
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const getQuestions = async () => {
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
    }

    useEffect(() => {
        getQuestions();
    }, []);

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
        const response = await axios.post("http://localhost:3000/user/result", selectedAnswers);
        navigate("/result", response.data);
    }

    return (
        <div className="font-mono relative">
            <div id="header" className="w-full h-[10vh] bg-gray-300 text-black px-10 py-4 border-b-2 flex items-center justify-between">
                <h1 className="text-4xl font-bold">QuizApp__</h1>
                <h1 className="text-2xl font-bold">
                    <span className="text-blue-500">
                        {category}
                    </span>
                    &nbsp;Quiz -&nbsp;
                    <span className={difficulty === "Easy" ? "text-green-700" : difficulty === "Medium" ? "text-amber-500" : "text-red-500"}>
                        {difficulty}
                    </span>
                </h1>
            </div>
            <div className="flex">
                <div id="navBar" className="w-[20vw] h-[90vh] bg-gray-300 border-r-2 px-4 py-10">
                    <h1 className="text-center mb-2 underline text-xl">Quiz Stats:</h1>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 shadow-2xl">Total questions: {questions.length}</h3>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 shadow-2xl">Questions Attempted: 0</h3>
                    <h3 className="w-full py-2 text-center text-xl mb-2 rounded border-2 bg-gray-200 shadow-2xl">Questions Remaining: 0</h3>

                    {/* <h1 className="text-center mt-5 mb-2 underline text-xl">Your Answers:</h1>
                    <div id="selected-answers" className="h-auto border-2 p-2 rounded text-center bg-gray-200 shadow-2xl">
                        {
                            questions.length !== 0 && (
                                questions.map((q, idx) => (
                                    <h6 key={idx}>Q{idx + 1} {"->"} </h6>
                                ))
                            )
                        }
                    </div> */}
                </div>
                <div id="main" className="w-[80vw] h-[90vh] bg-gray-200 py-5 px-20 relative">
                    {
                        questions.length !== 0 && (
                            <div className="">
                                <h1 className="text-center text-2xl font-bold italic">Question {currentQuestion + 1}</h1>
                                <h2 className="text-2xl mt-10">&#x2022; {questions[currentQuestion].question}</h2>
                                <div id="options" className="my-5">
                                    {
                                        questions[currentQuestion].options.map((option, index) => (
                                            <div key={index} className="text-xl space-x-3 space-y-8 ">
                                                <input
                                                    type="radio"
                                                    name={questions[currentQuestion].question}
                                                    value={option}
                                                    id={option}
                                                    onChange={() => handleChange(questions[currentQuestion]._id, option)}
                                                />
                                                <label htmlFor={option}>{option}</label>
                                            </div>
                                        ))
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