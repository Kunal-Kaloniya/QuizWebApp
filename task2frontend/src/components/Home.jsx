import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Home() {

    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState([]);

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [message, setMessage] = useState("");

    const instructionList = [
        { id: 1, i: "Read all questions carefully before answering." },
        { id: 2, i: "It is advised not to use unfair means." },
        { id: 3, i: "Manage your time wisely. The total duration of the quiz is 3 minutes." },
        { id: 4, i: "There is 1 mark for every correct answer." },
        { id: 5, i: "Review your answers if time permits before submission." }
    ]

    const navigate = useNavigate();

    useEffect(() => {

        const getCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/quiz/categories");

                setCategories(response.data);

            } catch (err) {
                console.error("There was some error fetching categories: ", err)
            }
        }

        const getDifficultyLevels = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/quiz/difficulties");

                setDifficulties(response.data);

            } catch (err) {
                console.error("There was some error fetching quiz difficulty levels: ", err)
            }
        }

        getDifficultyLevels();
        getCategories();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 5000)
    }, [message, setMessage])


    const handleClick = async () => {
        if (!category || !difficulty) {
            setMessage("Please select both quiz category and difficulty");
            return;
        }

        setMessage("");
        navigate("/quiz", { state: { category, difficulty } });
    }

    return (
        <div className="font-mono relative">
            <div className="mt-5 pl-5">
                <h1 className="text-4xl font-bold mb-3">Welcome {user?.username}!</h1>
            </div>

            <div className="w-auto h-[50vh] bg-white mt-5 flex items-center justify-center gap-2 px-2">

                <div id="navBar" className="h-full border-2 pt-5 pb-3 px-10 rounded-xl bg-gray-100 flex flex-col flex-1/2 justify-center">
                    <h1 className="text-center mb-5 underline text-2xl text-red-400 font-bold">Instructions</h1>
                    <ol className="text-xl">
                        {
                            instructionList.length !== 0 && (
                                instructionList.map((ins) => (
                                    <li key={ins.id}>{ins.id}. {ins.i}</li>
                                ))
                            )
                        }
                    </ol>
                </div>

                <div className="h-full border-2 pt-5 pb-3 px-10 rounded-xl bg-gray-100 flex flex-col flex-1/2 justify-center">
                    <h2 className="text-2xl mb-2 font-bold">Ready to take another quiz: </h2>

                    <div className="w-auto h-auto px-6 py-4 bg-gray-200 mb-2 rounded-lg border-2 flex justify-between items-center">
                        <p>Which category do you want to select for the quiz today:</p>

                        <select
                            name="categoryOptions"
                            onChange={e => { setCategory(e.target.value); setMessage("") }}
                            className="px-3 py-1 bg-white ml-2 rounded border-2 border-white hover:border-black transition-all"
                        >
                            <option defaultChecked value="">-- select --</option>
                            {
                                categories.length !== 0 && (
                                    categories.map((category, index) => (
                                        <option value={category} key={index}>{category}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                    <div className="w-auto h-auto px-6 py-4 bg-gray-200 mb-2 rounded-lg border-2 flex justify-between items-center">
                        <p>Choose the difficulty of the quiz:</p>

                        <select
                            name="difficultyOptions"
                            onChange={e => { setDifficulty(e.target.value), setMessage("") }}
                            className="px-3 py-1 bg-white ml-2 rounded border-2 border-white hover:border-black transition-all"
                        >
                            <option defaultChecked value="">-- select --</option>
                            {
                                difficulties.length !== 0 && (
                                    difficulties.map((difficulty, index) => (
                                        <option value={difficulty} key={index}>{difficulty}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                    <div className="max-w-[80vw] mx-auto flex justify-center">
                        <button
                            onClick={handleClick}
                            className="my-2 px-4 py-2 border-2 rounded-2xl hover:bg-amber-100 transition-all"
                        >
                            Start Quiz
                        </button>
                    </div>

                    {
                        message && (
                            <p className="m-4 bg-amber-700 text-white text-center p-5 absolute top-[10vh] right-2">{message}</p>
                        )
                    }
                </div>
            </div>
        </div >
    );
}

export default Home;