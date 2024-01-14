import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import AuthLoading from "../components/Loading/AuthLoading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <AuthLoading></AuthLoading>
    }
    if (user) {
        return children;
    }
    return (<Navigate to='/login' state={{ from: location }} replace></Navigate>
    );
};
PrivateRoute.propTypes = {
    children: PropTypes.node
};
export default PrivateRoute;