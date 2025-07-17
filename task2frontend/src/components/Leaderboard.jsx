import axios from "axios";
import { useState, useEffect } from "react";

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/leaderboard", {
                    headers: {
                        Authorization: "Player " + localStorage.getItem("token"),
                    }
                });

                setLeaderboard(response.data);
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            }
        };

        fetchLeaderboard();
    }, [])

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
            <table className="text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-black">
                        <th className="p-2 border">Rank</th>
                        <th className="p-2 border">Username</th>
                        <th className="p-2 border">Total Score</th>
                        <th className="p-2 border">Quizzes Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <tr key={user.username} className="hover:bg-gray-100">
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{user.username}</td>
                            <td className="p-2 border">{user.totalScore}</td>
                            <td className="p-2 border">{user.quizzesTaken}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;