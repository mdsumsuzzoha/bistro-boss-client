import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaCalendarCheck, FaHome, FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";


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
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;