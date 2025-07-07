import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <div className="bg-gray-900 text-white px-4 py-4 flex flex-row items-center justify-between absolute top-0 left-0 right-0">
                <h1 className="text-2xl font-bold">Quiz App</h1>
                <div className="space-x-2 text-black">
                    <button className="px-4 py-2 bg-white font-medium rounded hover:bg-blue-500 border-2 hover:border-white transition-all" onClick={() => { navigate("/signup") }}>SignUp</button>
                    <button className="px-4 py-2 bg-white font-medium rounded hover:bg-green-500 border-2 hover:border-white transition-all" onClick={() => { navigate("/login") }}>Login</button>
                </div>
            </div>
            <div className="w-full h-screen bg-gray-500">

            </div>
        </div>
    );
}

export default Home;