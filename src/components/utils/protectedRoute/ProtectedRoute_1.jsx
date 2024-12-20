import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from '../../../contextapi.js/user_context';
import { useContext } from "react";
import PropTypes from 'prop-types';

const ProtectedRoute_1 = ({roles}) => {
    const {user_role} = useContext(UserContext);
    
    const token = localStorage.getItem("access_token")
    
    if(token === null) return <Navigate to="/login" />
    
    return (roles.includes(user_role) ? <Outlet /> : <Navigate to="/" />)
};

ProtectedRoute_1.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute_1;