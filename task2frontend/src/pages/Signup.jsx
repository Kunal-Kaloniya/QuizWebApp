import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constant.jsx";

function Signup() {

    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/api/auth/signup`, form);
            setForm({ username: "", email: "", password: "" });
            toast.success("Signup successfull!");
            navigate("/login");
        } catch (err) {
            toast.error("Signup failed!");
        }
    }

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center bg-white dark:bg-slate-700 transition-colors font-mono px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md text-black dark:text-white bg-gray-200 dark:bg-slate-800 rounded-md shadow-lg p-6 sm:p-8">

                <h1 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl mb-6">
                    SignUp
                </h1>

                <form onSubmit={handleSignup} className="flex flex-col space-y-4">

                    <label htmlFor="username" className="text-sm mb-1">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-slate-700 shadow-md text-sm sm:text-base rounded-md"
                    />

                    <label htmlFor="email" className="text-sm mb-1">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-slate-700 shadow-md text-sm sm:text-base rounded-md"
                    />

                    <label htmlFor="password" className="text-sm mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-slate-700 shadow-md text-sm sm:text-base rounded-md"
                    />

                    <button
                        type="submit"
                        className="w-50 mx-auto py-2 mt-4 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>


                <p className="mt-5 text-xs sm:text-sm text-center">
                    Already a user? Try
                    <Link to="/login" className="text-blue-500 pl-2 font-bold">Loging in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;