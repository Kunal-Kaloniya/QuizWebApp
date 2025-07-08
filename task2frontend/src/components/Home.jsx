import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Home() {

    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [difficulties, setDifficulties] = useState([]);

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [message, setMessage] = useState("");

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

    const handleClick = async () => {
        if (!category || !difficulty) {
            setMessage("Please choose both quiz category and difficulty");
            return;
        }

        setMessage("");

        await axios.get("http://localhost:3000/api/quiz/questions", {
            params: {
                category: category,
                difficulty: difficulty
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error("Error: ", err);
            })
    }

    return (
        <div>
            <div className="w-full h-screen bg-amber-200 font-mono">
                <div>
                    <h1 className="text-4xl font-bold">Hello {user.username}!</h1>

                    <h2 className="text-2xl">Ready to take another quiz: </h2>

                    <p>
                        Which category you want to select for the quiz today:

                        <select name="categoryOptions" onChange={e => setCategory(e.target.value)}>
                            <option defaultChecked value="">-- select a category --</option>
                            {
                                categories.length !== 0 && (
                                    categories.map((category, index) => (
                                        <option value={category} key={index}>{category}</option>
                                    ))
                                )
                            }
                        </select>
                    </p>
                    <p>
                        Choose the difficulty for the quiz:

                        <select name="difficultyOptions" onChange={e => setDifficulty(e.target.value)}>
                            <option defaultChecked value="">-- select a difficulty --</option>
                            {
                                difficulties.length !== 0 && (
                                    difficulties.map((difficulty, index) => (
                                        <option value={difficulty} key={index}>{difficulty}</option>
                                    ))
                                )
                            }
                        </select>
                    </p>

                    <button onClick={handleClick}>Start Quiz</button>

                    {
                        message && (
                            <p>{message}</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;