import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {

    const location = useLocation();

    const { result } = location.state;
    const { questions, selectedAnswers } = location.state || [];
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (result < 5) {
            setMessage("You need to practice more about the concepts.");
        } else if (result >= 5 && result < 9) {
            setMessage("Not bad but not too good! Try harder");
        } else {
            setMessage("Great Job! Keep working hard like this.");
        }
    }, [])

    return (
        <div className="font-mono">
            <div id="main" className="max-w-[90vw] h-auto bg-gray-100 mt-5 mx-auto border-2 rounded-xl">
                <div className="text-center p-10 text-xl">
                    <h1 className="text-3xl font-bold mb-5">Your score is {result} out of {questions.length}.</h1>
                    <p>You have attempted {Object.keys(selectedAnswers).length} out of {questions.length} questions</p>
                    <p>Of which {Object.keys(selectedAnswers).length - result} {Object.keys(selectedAnswers).length - result === 1 ? "was" : "were"} incorrect</p>
                </div>
                <div>
                    {
                        message && (
                            <p className="text-center italic font-bold mb-5">"{message}"</p>
                        )
                    }
                </div>
            </div>

            <div id="footer" className="max-w-[90vw] h-auto bg-gray-100 my-5 mx-auto border-2 rounded-xl p-3">
                <h1 className="text-xl font-bold text-center mb-3">Explanation: </h1>
                <div className="grid grid-cols-2 gap-2">
                    {
                        questions.length !== 0 && (
                            questions.map((q, index) => {
                                const isCorrect = questions[index].correctAnswer === selectedAnswers[q._id];
                                return (
                                    <div className={`${isCorrect ? "bg-green-200" : "bg-red-200"} rounded-xl border-2 px-4 py-2`} key={index}>
                                        <h1><span className="font-black">Q{index + 1}:</span> {q.question}</h1>
                                        <p><span className="font-black">Correct Answer:</span> {q.correctAnswer}</p>
                                        <p><span className="font-black">Your Answer:</span> {selectedAnswers[q._id] ? selectedAnswers[q._id] : "N/A"}</p>
                                        <p><span className="font-black">Explanation:</span> {q.explanation}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Result;