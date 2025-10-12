import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Menu, X } from "lucide-react";

function Header() {

    const { isLogged, user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const navigationLinks = [
        {
            id: 1,
            to: '/',
            text: "Home"
        }, {
            id: 2,
            to: '/dashboard',
            text: "Dashboard"
        }, {
            id: 3,
            to: '/quiz-select',
            text: "Quiz"
        },
    ]

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="w-full bg-white dark:bg-[#0A192F] dark:text-[#CCD6F6] sticky top-0 left-0 right-0 z-10 border-b border-gray-200 dark:border-gray-800">
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center justify-between px-10 py-4 h-[10vh]">

                <img
                    src="/Intellectra.png"
                    alt="website_logo"
                    className="w-25 h-10 rounded-md"
                    onClick={() => navigate("/")}
                />

                {isLogged ? (
                    <>
                        <div className="flex gap-5 font-medium">
                            {navigationLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.to}
                                    className="text-md px-2 py-2 text-gray-700 dark:text-[#CCD6F6] hover:text-[#64FFDA] transition-all"
                                >
                                    {link.text}
                                </Link>
                            ))}
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="text-md px-2 py-2 text-gray-700 dark:text-[#CCD6F6] hover:text-[#64FFDA] transition-all"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-2xl rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-2xl rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                            {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-4 py-2 bg-[#64FFDA] text-[#172A45] font-bold rounded hover:bg-[#96FFE8] transition-all"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 bg-[#64FFDA] text-[#172A45] font-bold rounded hover:bg-[#96FFE8] transition-all"
                        >
                            Login
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile Nav */}
            <nav className="flex md:hidden items-center justify-between px-6 py-4 h-[10vh]">

                <img
                    src="/Intellectra.png"
                    alt="website_logo"
                    className="w-15 h-7 rounded-md"
                    onClick={() => navigate("/")}
                />

                <button onClick={toggleMenu} className="focus:outline-none text-[#CCD6F6]">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute top-[10vh] right-0 w-full bg-white dark:bg-[#172A45] flex flex-col items-center py-6 space-y-4 shadow-md">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.to}
                                className="text-lg font-medium text-gray-700 dark:text-[#CCD6F6] hover:text-[#64FFDA] transition-all"
                                onClick={closeMenu}
                            >
                                {link.text}
                            </Link>
                        ))}

                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="text-lg font-medium text-gray-700 dark:text-[#CCD6F6] hover:text-[#64FFDA] transition-all"
                                onClick={closeMenu}
                            >
                                Admin
                            </Link>
                        )}

                        {isLogged ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                                className="px-6 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-3 items-center">
                                <button
                                    onClick={() => {
                                        navigate("/signup");
                                        closeMenu();
                                    }}
                                    className="px-6 py-2 bg-[#64FFDA] text-[#172A45] rounded-md font-bold hover:bg-[#96FFE8] transition-all"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/login");
                                        closeMenu();
                                    }}
                                    className="px-6 py-2 bg-[#64FFDA] text-[#172A45] rounded-md font-bold hover:bg-[#96FFE8] transition-all"
                                >
                                    Login
                                </button>
                            </div>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:shadow-lg bg-gray-200 dark:bg-gray-700 transition-all flex items-center gap-2 text-gray-700 dark:text-[#CCD6F6]"
                        >
                            <span className="inline-block">{theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}</span> Theme
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;