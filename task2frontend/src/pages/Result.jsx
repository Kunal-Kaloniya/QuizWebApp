import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {

    const location = useLocation();

    const { score } = location.state;
    const { results } = location.state || [];
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (score < 5) {
            setMessage("You need to practice more about the concepts.");
        } else if (score >= 5 && score < 9) {
            setMessage("Not bad but not too good! Try harder");
        } else {
            setMessage("Great Job! Keep working hard like this.");
        }
    }, [])

    return (
        // <div className="font-mono py-5 bg-white dark:bg-[#0A192F] text-black dark:text-[#CCD6F6] transition-all">
        //     {/* Score Section */}
        //     <section className="w-[90vw] sm:w-[80vw] py-8 mx-auto rounded-xl text-black bg-white dark:bg-[#172A45] dark:text-[#CCD6F6] shadow-lg">
        //         <div className="text-center pb-6 text-base sm:text-lg transition-all">
        //             <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        //                 Your score is <span className="text-[#64FFDA]">{score}</span> out of {questions.length}.
        //             </h1>
        //             <p>You attempted {Object.keys(selectedAnswers).length} of {results.length} questions.</p>
        //             <p>
        //                 <span className="text-red-500">{Object.keys(selectedAnswers).length - score}</span>{" "}
        //                 {Object.keys(selectedAnswers).length - score === 1 ? "was" : "were"} incorrect.
        //             </p>
        //         </div>

        //         {message && (
        //             <p className="text-center italic font-bold text-sm sm:text-base">"{message}"</p>
        //         )}
        //     </section>

        //     {/* Explanation Section */}
        //     <section className="w-[95vw] sm:w-[90vw] mt-6 mx-auto rounded-xl p-4 sm:p-6 text-black bg-white dark:bg-[#172A45] transition-all shadow-md">
        //         <h2 className="text-lg sm:text-xl font-bold text-center mb-4 dark:text-[#CCD6F6]">Explanation</h2>

        //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        //             {questions.length > 0 &&
        //                 questions.map((q, index) => {
        //                     const isCorrect = q.correctAnswer === selectedAnswers[q._id];
        //                     return (
        //                         <div
        //                             key={index}
        //                             className={`${isCorrect
        //                                 ? "bg-green-100 border-green-400" 
        //                                 : "bg-red-100 border-red-400"
        //                                 } border rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-gray-900`}
        //                         >
        //                             <h1 className="font-semibold">
        //                                 <span className="font-black">Q{index + 1}:</span> {q.question}
        //                             </h1>
        //                             <p><span className="font-black">Correct Answer:</span> <span className="text-green-600 dark:text-green-400">{q.correctAnswer}</span></p>
        //                             <p>
        //                                 <span className="font-black">Your Answer:</span>{" "}
        //                                 <span className="text-red-600 dark:text-red-400">{selectedAnswers[q._id] || "N/A"}</span>
        //                             </p>
        //                             <p><span className="font-black">Explanation:</span> {q.explanation}</p>
        //                         </div>
        //                     );
        //                 })}
        //         </div>
        //     </section>
        // </div>

        <div className="font-mono py-5 bg-white dark:bg-[#0A192F] text-black dark:text-[#CCD6F6] transition-all">
            {/* Score Section */}
            <section className="w-[90vw] sm:w-[80vw] py-8 mx-auto rounded-xl text-black bg-white dark:bg-[#172A45] dark:text-[#CCD6F6] shadow-lg">
                <div className="text-center pb-6 text-base sm:text-lg transition-all">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                        Your score is <span className="text-[#64FFDA]">{score}</span> out of {results.length}.
                    </h1>

                    <p>You attempted {results.filter(r => r.status !== 'skipped').length} of {results.length} questions.</p>
                    <p>
                        <span className="text-red-500">{results.filter(r => r.status === 'incorrect').length}</span>{" "}
                        {results.filter(r => r.status === 'incorrect').length === 1 ? "was" : "were"} incorrect.
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
                    {results.length > 0 && results.map((result, index) => (
                        <div
                            key={result._id}
                            className={`${result.status === 'correct'
                                ? "bg-green-100 border-green-400 dark:bg-green-200"
                                : result.status === 'incorrect'
                                    ? "bg-red-100 border-red-400 dark:bg-red-200"
                                    : "bg-gray-100 border-gray-400 dark:bg-gray-200"
                                } border rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 dark:text-gray-900`}
                        >
                            <h1 className="font-semibold">
                                <span className="font-black">Q{index + 1}:</span> {result.questionText}
                            </h1>
                            <p><span className="font-black">Correct Answer:</span> <span className="text-green-600 dark:text-green-400">{result.correctAnswer}</span></p>
                            <p>
                                <span className="font-black">Your Answer:</span>{" "}
                                <span className="text-red-600 dark:text-red-400">{result.selectedAnswer || "N/A"}</span>
                            </p>
                            <p><span className="font-black">Explanation:</span> {result.explanation}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Result;