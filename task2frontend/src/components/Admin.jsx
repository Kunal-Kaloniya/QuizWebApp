import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState({ status: "fail", msg: "" });
    const [deleteQuesId, setDeleteQuesId] = useState("");
    const [form, setForm] = useState({
        "question": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
        "category": "",
        "difficulty": "",
        "explanation": ""
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        logout();
        navigate('/login');
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const handleAddQuestion = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/admin/add-question", form, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            setMessage({ status: "pass", msg: "Successfully added the question!" });
            setForm({
                "question": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "difficulty": "",
                "explanation": ""
            })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to add the question!" });
            console.error("Error adding question: ", err);
        }
    }

    // const handleUpdateQuestion = async (e) => {
    //     e.preventDefault();
    // }

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/admin/delete-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setMessage({ status: "pass", msg: "Successfully deleted the question!" })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to Delete the question!" });
            console.error("Failed to update question: ", err);
        }
    }

    useEffect(() => {
        if (message.msg !== "") {
            const timer = setTimeout(() => {
                setMessage({ status: "", msg: "" });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="font-mono">
            <div id="header" className="w-full h-[10vh] bg-gray-300 text-black px-10 py-4 border-b-2 flex items-center justify-between">
                <h1 className="text-4xl font-bold">QuizApp__</h1>
                <div className="flex gap-2">
                    <button
                        className="p-2 bg-white border-black border-2 text-xl text-black hover:bg-black hover:text-white transition-all cursor-pointer rounded-full flex items-center justify-center"
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                    </button>
                    <button className="bg-white text-xl text-blue-500 rounded px-3 py-1 border-2 border-blue-500 hover:shadow-2xl hover:bg-blue-500 hover:text-white transition-all" onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <button className="bg-white text-xl text-red-500 rounded px-3 py-1 border-2 border-red-500 hover:shadow-2xl hover:bg-red-500 hover:text-white transition-all" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className="p-5">
                <div className="mb-5">
                    <h1 className="text-3xl font-bold">Welcome to the Admin Panel!</h1>
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <h1>Add a question -</h1>
                        <hr className="w-[90%]" />

                        <form className="flex flex-col gap-2 p-5" onSubmit={handleAddQuestion}>
                            <input type="text" name="question" placeholder="question" value={form.question} onChange={handleChange} className="max-w-auto border-2 rounded-md px-3 py-1" />

                            <div className="grid grid-cols-2 gap-1 my-2">
                                {
                                    form.options.map((opt, index) => (
                                        <input key={index} type="text" name="options" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`option-${index}`} className="border-2 rounded-md px-3 py-1" />
                                    ))
                                }
                            </div>

                            <input type="text" name="correctAnswer" placeholder="correct answer" value={form.correctAnswer} onChange={handleChange} className="max-w-auto border-2 rounded-md px-3 py-1 mb-2" />

                            <input type="text" name="category" placeholder="category" value={form.category} onChange={handleChange} className="max-w-auto border-2 rounded-md px-3 py-1" />

                            <div className="my-2">
                                <label htmlFor="difficulty" className="inline-block">Difficulty: </label>
                                <select name="difficulty" id="difficulty" value={form.difficulty} onChange={handleChange} className="ml-2 px-3 py-1 border-2 rounded-md">
                                    <option defaultChecked value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            <textarea name="explanation" id="explanation" placeholder="explanation" value={form.explanation} onChange={handleChange} className="border-2 rounded-md px-3 py-1"></textarea>

                            <button type="submit" className="bg-white text-xl text-gray-900 rounded-md px-3 py-1 border-3 border-gray-900 hover:shadow-2xl hover:bg-gray-900 hover:text-white transition-all hover:font-bold">Add Question</button>
                        </form>
                    </div>
                    <div>
                        <div>
                            <h1>Update a question -</h1>
                            <hr className="w-[90%]" />


                        </div>
                        <div className="flex flex-col">
                            <h1>Delete a question -</h1>
                            <hr className="w-[90%]" />

                            <input type="text" name="questionId" placeholder="question id" value={deleteQuesId} onChange={(e) => setDeleteQuesId(e.target.value)} className="max-w-auto border-2 rounded-md px-3 py-1 my-3" />

                            <button type="submit" className="bg-white text-xl text-red-900 rounded-md px-3 py-1 border-3 border-red-900 hover:shadow-2xl hover:bg-red-900 hover:text-white transition-all hover:font-bold" onClick={() => handleDeleteQuestion(deleteQuesId)}>Delete Question</button>
                        </div>
                    </div>
                </div>

                {
                    message.msg && (
                        <div className={`${message.status === "pass" ? "bg-green-500" : "bg-red-500"} text-white text-xl px-10 py-5 absolute top-[12vh] right-0`}>
                            <h1>{message.msg}</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Admin;