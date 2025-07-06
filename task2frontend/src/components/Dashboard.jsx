import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(async () => {

        const token = localStorage.getItem("token");

        await axios.get("http://localhost:3000/profile", {
            headers: {
                Authorization: `Player ${token}`
            }
        })
            .then(res => { setUser(res.data.user) })
            .catch(err => { console.error(err.response?.data?.msg || "Error fetching profile") });

    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <p>Welcome, {user.username}</p>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Dashboard;