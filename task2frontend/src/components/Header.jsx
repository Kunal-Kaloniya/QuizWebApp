import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Header() {

    const { isLogged, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div id="header" className="w-full h-[10vh] font-mono bg-gray-300 text-black px-10 py-4 border-b-2 flex items-center justify-between">
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
                        <div className="">
                            <Link className="px-4 py-3 rounded-full bg-amber-100 mr-2">{user?.username[0].toUpperCase()}</Link>

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