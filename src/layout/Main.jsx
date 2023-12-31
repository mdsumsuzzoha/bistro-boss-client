import { Outlet } from "react-router-dom";
// import Navbar from "../pages/Shared/Navbar/Navbar";
// import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;