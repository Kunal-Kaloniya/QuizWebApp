import { Outlet } from "react-router-dom"
import Header from "./src/components/Header"

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}