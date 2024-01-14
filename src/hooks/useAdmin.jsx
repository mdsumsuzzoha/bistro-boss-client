import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    // console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, idPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data.admin;
        } 
    })
    return [isAdmin, isAdminLoading];
};

export default useAdmin;