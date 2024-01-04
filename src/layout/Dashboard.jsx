import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaCalendarCheck, FaGripLines, FaHome, FaMailBulk, FaShoppingBag, FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";


const Dashboard = () => {
    return (
        <div className="flex ">
            <div className="w-[280px] min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">
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
                    </li>
                    <div className="divider divider-warning"></div>
                    <li>
                        <NavLink to='/' className="uppercase text-xl"> <FaHome />Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu' className="uppercase text-xl"> <FaGripLines />menu</NavLink>
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