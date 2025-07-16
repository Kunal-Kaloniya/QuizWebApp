import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

function Header() {

    const { isLogged, user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div id="header" className={`w-full h-[10vh] font-mono px-10 py-4 border-b-2 flex items-center justify-between fixed top-0 left-0 right-0 z-10 transition-all ${theme === "light" ? "bg-gray-300 text-black" : "bg-gray-900 text-white"}`}>
            <h1 className="text-3xl font-bold">QuizApp__</h1>
            {
                isLogged && (
                    <>
                        <div className="font-medium flex gap-5">
                            <Link
                                to='/'
                                className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                            >
                                Home
                            </Link>
                            <Link
                                to='/dashboard'
                                className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to='/home'
                                className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                            >
                                Quiz
                            </Link>
                            {
                                user?.role === "admin" && (
                                    <Link
                                        to='/admin'
                                        className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                                    >
                                        Admin
                                    </Link>
                                )
                            }
                        </div>
                        <div className="flex items-center gap-2">

                            <button onClick={toggleTheme} className="p-2 text-2xl rounded-full border hover:shadow-lg transition-all">
                                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                            </button>

                            <button className="bg-white text-red-500 rounded px-3 py-1 border-2 border-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all" onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                )
            }
            {
                !isLogged && (
                    <div className="space-x-2 text-black text-sm">
                        <button className="px-4 py-2 bg-white font-bold text-blue-500 border-blue-500 rounded hover:bg-blue-500 hover:text-white border-2 transition-all" onClick={() => { navigate("/signup") }}>SignUp</button>
                        <button className="px-4 py-2 bg-white font-bold text-green-500 border-green-500 hover:text-white rounded hover:bg-green-500 border-2 transition-all" onClick={() => { navigate("/login") }}>Login</button>
                    </div>
                )
            }
        </div>
    )
}

export default Header;