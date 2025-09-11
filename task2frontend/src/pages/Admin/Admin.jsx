import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddQuestionForm from "./AddQuestion";
import UpdateQuestion from "./UpdateQuestion";
import DeleteQuestion from "./DeleteQuestion";
import ViewQuestions from "./ViewQuestions";
import ManageUsers from "./ManageUsers";

function Admin() {

    const [activeTab, setActiveTab] = useState("add");
    const [users, setUsers] = useState([]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/fetch-users", {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(response.data);

        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to fetch users!" });
            console.error("Failed to fetch users: ", err);
        }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === "users") {
            fetchUsers();
        }
    }

    const handleDeleteUser = async (id, index) => {

        const newUserArr = [...users];
        newUserArr.splice(index, 1);

        try {
            await axios.delete(`http://localhost:3000/admin/delete-user/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(newUserArr);
            setMessage({ status: "pass", msg: "Successfully deleted the user!" })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to Delete the user!" });
            console.error("Failed to delete user: ", err);
        }
    }

    return (
        <div className="min-h-[90vh] font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="py-6 text-center border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
                </div>

                <nav className="flex-1 py-4 space-y-2">
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

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Your Company
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
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