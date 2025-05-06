import { Outlet,useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthMiddleware = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/auth-page');
        }
    },[navigate, token])
    return (
        <Outlet />
    )
}

export default AuthMiddleware