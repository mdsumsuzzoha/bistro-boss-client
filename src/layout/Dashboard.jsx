import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaCalendarCheck, FaHome, FaList, FaListAlt, FaMailBulk, FaShoppingBag, FaShoppingCart, FaStarHalfAlt, FaUsers, FaUtensils } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {

    //TODO: get os Admin value from the DB
    const isAdmin = useAdmin();
    console.log(isAdmin);
    return (
        <div className="flex ">
            <div className="w-[280px] min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminHome' className="uppercase text-xl"> <FaHome />
                                        Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems' className="uppercase text-xl"> <FaUtensils /> Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageItems' className="uppercase text-xl"> <FaList /> Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageBooking' className="uppercase text-xl"> <FaBook />Manage Booking</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users' className="uppercase text-xl"> <FaUsers />All users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userHome' className="uppercase text-xl"> <FaHome />
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation' className="uppercase text-xl"> <FaCalendarAlt /> reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart' className="uppercase text-xl"> <FaShoppingCart /> My cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myBooking' className="uppercase text-xl"> <FaStarHalfAlt />add review</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/myBooking' className="uppercase text-xl"> <FaCalendarCheck />my booking</NavLink>
                                </li></>

                    }
                    <div className="divider divider-warning"></div>
                    <li>
                        <NavLink to='/' className="uppercase text-xl"> <FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu' className="uppercase text-xl"> <FaListAlt />menu</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad' className="uppercase text-xl"> <FaShoppingBag />Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className="uppercase text-xl"> <FaMailBulk />Contact Us</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;