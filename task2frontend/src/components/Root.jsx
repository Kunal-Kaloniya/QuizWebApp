import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Root() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0A192F] transition-colors duration-300">
            <Header />
            <Outlet />
        </div>
    )
}