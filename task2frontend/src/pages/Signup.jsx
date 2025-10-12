import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constant.jsx";
import { validateInputs } from "../helpers/validateInputs.js";
import Loader from "../components/Loader.jsx";

function Signup() {

    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        // !-------------- Validated the input fields
        const isValid = validateInputs(form);
        if (!isValid) {
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(`${BASE_URL}/api/auth/signup`, form);
            setForm({ username: "", email: "", password: "" });
            toast.success(res.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message || "Network Error! Please try later");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center bg-white dark:bg-[#0A192F] transition-colors font-mono px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md bg-gray-200 dark:bg-[#172A45] dark:text-white rounded-md shadow-lg p-6 sm:p-8">

                <h1 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl mb-6 text-black dark:text-[#CCD6F6]">
                    SignUp
                </h1>

                <form onSubmit={handleSignup} className="flex flex-col space-y-4">

                    <label htmlFor="username" className="text-sm mb-1 text-black dark:text-[#CCD6F6]">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-[#0A192F] shadow-md text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#64FFDA] transition-colors"
                    />

                    <label htmlFor="email" className="text-sm mb-1 text-black dark:text-[#CCD6F6]">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-[#0A192F] shadow-md text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#64FFDA] transition-colors"
                    />

                    <label htmlFor="password" className="text-sm mb-1 text-black dark:text-[#CCD6F6]">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-[#0A192F] shadow-md text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#64FFDA] transition-colors"
                    />

                    <button
                        type="submit"
                        className="w-50 mx-auto py-2 mt-4 rounded-md bg-[#64FFDA] text-[#172A45] font-bold hover:bg-[#96FFE8] transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-5 text-xs sm:text-sm text-center text-black dark:text-gray-400">
                    Already a user? Try
                    <Link to="/login" className="text-blue-500 dark:text-[#64FFDA] pl-2 font-bold">Logging in</Link>
                </p>
            </div>

            {isLoading && (
                <Loader message="Signing you up ..." />
            )}
        </div>
    );
}

export default Signup;