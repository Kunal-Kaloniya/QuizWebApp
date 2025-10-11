import { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger icons
import AddQuestionForm from "./AddQuestion";
import UpdateQuestion from "./UpdateQuestion";
import DeleteQuestion from "./DeleteQuestion";
import ViewQuestions from "./ViewQuestions";
import ManageUsers from "./ManageUsers";

function Admin() {
    const [activeTab, setActiveTab] = useState("add");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false); // auto-close sidebar on selection (mobile)
    };

    return (
        <div className="min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row transition-all">
            {/* Header (mobile only) */}
            <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 px-4 py-3 shadow-sm">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-40 top-[19vh] left-0 h-full md:h-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64`}
            >
                <div className="hidden md:block py-6 text-center border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
                </div>

                <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
                    {["add", "update", "delete", "questions", "users"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`w-full text-left px-6 py-3 transition-colors font-medium ${activeTab === tab
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {tab === "users"
                                ? "Manage Users"
                                : tab === "questions"
                                    ? "View All Questions"
                                    : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Question`}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto mt-14 md:mt-0">
                {activeTab === "add" && <AddQuestionForm />}
                {activeTab === "update" && <UpdateQuestion />}
                {activeTab === "delete" && <DeleteQuestion />}
                {activeTab === "questions" && <ViewQuestions />}
                {activeTab === "users" && <ManageUsers />}
            </main>
        </div>
    );
}

export default Admin;
