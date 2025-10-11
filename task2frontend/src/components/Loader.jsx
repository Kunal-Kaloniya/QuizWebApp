import { RiLoader3Line } from "react-icons/ri";

export default function Loader({ message }) {
    return (
        <div className="w-full min-h-screen fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-50 flex items-center justify-center">
            <div className="w-100 h-60 flex flex-col items-center justify-center rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-md dark:text-white p-8">
                <RiLoader3Line className="animate-spin text-4xl" />
                <span className="text-2xl font-semibold mt-4">{message || "Loading..."}</span>
            </div>
        </div>
    );
}