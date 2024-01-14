import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useMenu from "../../../../hooks/useMenu";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (item) => {
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
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }




    return (
        <div>
            <SectionTitle Heading="MANAGE ALL ITEMS" subHeading="---Hurry Up!---"></SectionTitle>
            <div className="w-[992px] mx-auto p-4">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <span>Index</span>
                                    </label>
                                </th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, idx) =>
                                    <tr key={item._id}>
                                        <th>
                                            <label>
                                                <span>{idx + 1}</span>
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h3>{item.name}</h3>
                                        </td>
                                        <td>
                                            <h3>$ {item.price}</h3>
                                        </td>
                                        <th className="w-[20px]   text-center ">
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                                <button 
                                                    className="bg-red-700 p-4 rounded">
                                                    <FaEdit className="text-2xl text-center text-white mx-auto " />
                                                </button>
                                            </Link>

                                        </th>
                                        <th className="w-[20px]   text-center ">
                                            <button onClick={() => handleDelete(item)}
                                                className="bg-red-700 p-4 rounded">
                                                <FaTrashAlt className="text-xl text-center text-white mx-auto " /></button>

                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;