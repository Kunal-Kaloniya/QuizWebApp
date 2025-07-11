import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

    const { user, logout } = useContext(AuthContext);

    const username = localStorage.getItem("username");

    return (
        <div className="font-mono">
            <div id="header" className="w-full h-[10vh] bg-gray-300 text-black px-10 py-4 mb-5 border-b-2 flex items-center justify-between">
                <h1 className="text-4xl font-bold">QuizApp__</h1>
            </div>

            <div className="flex flex-col items-center">
                {/* <h1 className="text-center text-3xl font-bold">User Dashboard</h1> */}

                <div className="w-[100px] h-[100px] bg-gray-700 flex items-center justify-center text-white text-3xl rounded-full my-5">
                    {username ? username[0].toUpperCase() : "?"}
                </div>
                <h1 className="text-center text-xl font-bold">{username ? username : "..."}</h1>
            </div>
        </div>
    );
}

export default Dashboard;