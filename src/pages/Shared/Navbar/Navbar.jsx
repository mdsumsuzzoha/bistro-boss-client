import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin, ] = useAdmin();
    // console.log('from NavBar', isAdmin, );
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(totalPrice)

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            position: "top-end",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Done",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    ).catch(error => console.log(error));

            }
        });


    }
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/salad'>Our Shop</Link></li>
        <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                </ul>
            </details>
        </li>
        <li><a>Item 3</a></li>
    </>

    return (

        <>
            <div className="navbar bg-black bg-opacity-15 px-10 fixed z-50 max-w-[1920px] text-white font-bold">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro BOOS <br />Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end space-x-6">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-gray-600 opacity-10 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cart.length} Items</span>
                                <span className="text-info">Subtotal: ${totalPrice}</span>
                                <div className="card-actions">
                                    <Link
                                        // to='/dashboard'
                                        to={isAdmin ==true  ? '/dashboard/adminHome' : '/dashboard/userHome'}
                                        className="btn btn-outline btn-info btn-block">View Dashboard</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {user ? <><button onClick={handleLogOut} className="btn btn-active btn-ghost">Log Out</button>
                        </> : <><Link to='/login'>Login</Link></>}

                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <button onClick={handleLogOut} className="btn btn-outline btn-ghost">Log Out</button>
                        </ul>
                    </div>
                </div>
            </div></>
    );
};

export default Navbar;