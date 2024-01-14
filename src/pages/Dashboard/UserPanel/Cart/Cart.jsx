import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    // console.log(cart);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(totalPrice);
    const axiosSecure = useAxiosSecure();
    const handleDelete = (_id) => {
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
                axiosSecure.delete(`/carts/${_id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })



            }
        });
    }
    return (
        <div className="w-[992px] mx-auto">
            <div className="flex justify-evenly">
                <h3 className="text-4xl uppercase font-semibold">Total Orders: {cart.length}</h3>
                <h3 className="text-4xl uppercase font-semibold">Total Price: ${totalPrice}</h3>
                {cart.length ? <Link to='/dashboard/payment'>
                    <button className="btn btn-outline btn-info uppercase">pay</button>
                </Link>: <button disabled className="btn btn-outline btn-info uppercase">pay</button>}
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, idx) => <tr
                                    key={item._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.name}</td>
                                    <td>${item?.price}</td>
                                    <td className="w-[20px]   text-center ">
                                        <button onClick={() => handleDelete(item._id)}
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

export default Cart;