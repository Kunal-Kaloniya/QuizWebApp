import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/constant.jsx";
import { validateInputs } from "../helpers/validateInputs.js";
import Loader from "../components/Loader.jsx";

function Login() {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        // !-------------- Validated the input fields
        const isValid = validateInputs(form);
        if (!isValid) {
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
            localStorage.setItem("token", res.data.token);
            login({
                username: res.data.user.username,
                email: res.data.user.email,
                role: res.data.user.role,
            });
            setForm({ email: "", password: "" });
            toast.success(res.data.message);
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response.data.message || "Network Error! Please try later");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center bg-white dark:bg-[#0A192F] transition-colors font-mono px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md bg-gray-200 dark:bg-[#172A45] dark:text-white rounded-md shadow-lg p-6 sm:p-8">

                <h1 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-900 dark:text-[#CCD6F6]">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm mb-1 block text-gray-700 dark:text-[#CCD6F6]">E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-[#0A192F] shadow-md text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#64FFDA] transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm mb-1 block text-gray-700 dark:text-[#CCD6F6]">Password:</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            className="w-full h-10 md:h-15 px-3 outline-none bg-white dark:bg-[#0A192F] shadow-md text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 focus:border-[#64FFDA] transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-50 mx-auto py-2 mt-4 rounded-md bg-[#64FFDA] text-[#172A45] font-bold hover:bg-[#96FFE8] transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-5 text-xs sm:text-sm text-center text-gray-700 dark:text-gray-400">
                    New here?
                    <Link to="/signup" className="text-blue-500 dark:text-[#64FFDA] pl-1 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>

            {isLoading && (
                <Loader message="Logging you in ..." />
            )}
        </div>

    );
}

export default Login;