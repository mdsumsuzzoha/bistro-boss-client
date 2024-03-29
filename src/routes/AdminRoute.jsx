import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';
import AuthLoading from '../components/Loading/AuthLoading';


const AdminRoute = ({children}) => {
    // const [user, isLoading]= useAuth();
    const {user, loading} =useAuth();
    const [isAdmin, isAdminLoading]= useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <AuthLoading></AuthLoading>

    }
    if(user || isAdmin){
        return children;
    }
    return ( <Navigate to='/login' state={{from: location}} replace></Navigate>
    );
};
AdminRoute.propTypes = {
    children: PropTypes.node
  };

export default AdminRoute;