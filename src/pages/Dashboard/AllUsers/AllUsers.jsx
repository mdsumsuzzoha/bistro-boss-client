import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log(users);

    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }
    const handleUpdateUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change Role"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Changed!",
                                text: `${user.name} is an Admin now`,
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }
    return (
        <div className="w-[992px] mx-auto">
            <div>
                <h3 className="text-4xl font-bold">Total Users: {users.length}</h3>
            </div>
            <div className=" p-6">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr
                                    key={user._id}>
                                    <th>{idx + 1}</th>

                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td className="w-[20px]   text-center ">
                                        {user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleUpdateUser(user)}
                                                className="bg-red-700 p-4 rounded">
                                                <FaUsers className="text-2xl text-center text-white mx-auto " /></button>}

                                    </td>
                                    <td className="w-[20px]   text-center ">
                                        <button onClick={() => handleDelete(user._id)}
                                            className="bg-red-700 p-4 rounded">
                                            <FaTrashAlt className="text-xl text-center text-white mx-auto " /></button>

                                    </td>
                                </tr>)
                            }
                            {/* row 1 */}


                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default AllUsers;