import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome {user.username}</p>
        </div>
    );
}

export default Dashboard;