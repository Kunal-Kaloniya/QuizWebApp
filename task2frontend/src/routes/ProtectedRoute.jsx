import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function ProtectedRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const validateUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/auth/verify-token", {
                    headers: {
                        Authorization: "Player " + token,
                    }
                });

                setIsAuthenticated(true);
                if (response.status >= 200 && response.status < 300) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
                logout();       // *----------logout the user when the token is not valid or expired
            } finally {
                setIsLoading(false);
            }
        }

        validateUser();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-1 justify-center items-center">
                <FiLoader className='animate-spin' />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;