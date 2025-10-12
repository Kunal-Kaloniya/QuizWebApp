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
        <div className="font-mono py-5 bg-white dark:bg-[#0A192F] text-black dark:text-[#CCD6F6] transition-all">
            {/* Score Section */}
            <section className="w-[90vw] sm:w-[80vw] py-8 mx-auto rounded-xl text-black bg-white dark:bg-[#172A45] dark:text-[#CCD6F6] shadow-lg">
                <div className="text-center pb-6 text-base sm:text-lg transition-all">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                        Your score is <span className="text-[#64FFDA]">{result}</span> out of {questions.length}.
                    </h1>
                    <p>You attempted {Object.keys(selectedAnswers).length} of {questions.length} questions.</p>
                    <p>
                        <span className="text-red-500">{Object.keys(selectedAnswers).length - result}</span>{" "}
                        {Object.keys(selectedAnswers).length - result === 1 ? "was" : "were"} incorrect.
                    </p>
                </div>

                {message && (
                    <p className="text-center italic font-bold text-sm sm:text-base">"{message}"</p>
                )}
            </section>

            {/* Explanation Section */}
            <section className="w-[95vw] sm:w-[90vw] mt-6 mx-auto rounded-xl p-4 sm:p-6 text-black bg-white dark:bg-[#172A45] transition-all shadow-md">
                <h2 className="text-lg sm:text-xl font-bold text-center mb-4 dark:text-[#CCD6F6]">Explanation</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {questions.length > 0 &&
                        questions.map((q, index) => {
                            const isCorrect = q.correctAnswer === selectedAnswers[q._id];
                            return (
                                <div
                                    key={index}
                                    className={`${isCorrect
                                        ? "bg-green-100 border-green-400" 
                                        : "bg-red-100 border-red-400"
                                        } border rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-gray-900`}
                                >
                                    <h1 className="font-semibold">
                                        <span className="font-black">Q{index + 1}:</span> {q.question}
                                    </h1>
                                    <p><span className="font-black">Correct Answer:</span> <span className="text-green-600 dark:text-green-400">{q.correctAnswer}</span></p>
                                    <p>
                                        <span className="font-black">Your Answer:</span>{" "}
                                        <span className="text-red-600 dark:text-red-400">{selectedAnswers[q._id] || "N/A"}</span>
                                    </p>
                                    <p><span className="font-black">Explanation:</span> {q.explanation}</p>
                                </div>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}

export default Result;