import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} =useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="loading loading-spinner loading-md"></span>

    }
    if(user){
        return children;
    }
    return ( <Navigate to='/login' state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoute;