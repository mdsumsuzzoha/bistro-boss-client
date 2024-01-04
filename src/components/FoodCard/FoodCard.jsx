import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ item }) => {
    const { _id, name, image, recipe, price } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch]=useCart();

    const handleAddCart = (item) => {
        if (user && user?.email) {
            console.log(item, user?.email);
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, add it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    const cartItem = {
                        menuId: _id,
                        email: user.email,
                        name: name,
                    }
                    axiosSecure.post('/carts', cartItem)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Addeded",
                                    text: `Your ${name} has addeded.`,
                                    icon: "success"
                                });
                                refetch();
                            }
                        })
                }
            });

        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in first to add the item in cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            // Swal.fire({
            //     title: "Order Failed!",
            //     text: "Login first",
            //     icon: "error"
            // });
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className='text-sm bg-gray-700 text-white absolute right-0 mr-14 rounded-lg px-2 mt-14'>$ {price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddCart(item)} className="text-bold btn btn-outline btn-warning">Add to cart</button>
                </div>
            </div>
        </div>
    );
};
FoodCard.propTypes = {
    item: PropTypes.object
};
export default FoodCard;