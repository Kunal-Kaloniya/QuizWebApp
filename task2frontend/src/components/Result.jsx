import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {

    const location = useLocation();

    const { result } = location.state;

    return (
        <div>
            <div id="header" className="w-full h-[10vh] bg-gray-300 text-black px-10 py-4 border-b-2 flex items-center justify-between">
                <h1 className="text-4xl font-bold">QuizApp__</h1>
            </div>

            <div id="main">
                <h1>Your score is: {result}</h1>
            </div>
        </div>
    );
}

export default Result;