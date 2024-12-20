import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from '../../../contextapi.js/user_context';
import { useContext } from "react";

const ProtectedRoute_2 = () => {
    const {user_role} = useContext(UserContext);

    const token = localStorage.getItem("access_token")
    
    return (token && user_role == 'UPL' || user_role == 'ADM' ? <Outlet /> : <Navigate to="/" />)
};

export default ProtectedRoute_2;