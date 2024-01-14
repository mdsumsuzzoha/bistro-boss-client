import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SIgnUp/SignUp";
import Dashboard from "../layout/Dashboard";
import Cart from "../pages/Dashboard/UserPanel/Cart/Cart";
import AddItems from "../pages/Dashboard/AdminPanel/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/AdminPanel/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/AdminPanel/UpdateItem/UpdateItem";
import AllUsers from "../pages/Dashboard/AdminPanel/AllUsers/AllUsers";
import AdminHome from "../pages/Dashboard/AdminPanel/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserPanel/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Dashboard/AdminPanel/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/UserPanel/PaymentHistory/PaymentHistory";
import App from "../App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/test',
                element: <App></App>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            //genaral user routes
            {
                path: 'userHome',
                element:
                    <PrivateRoute>
                        <UserHome></UserHome>
                    </PrivateRoute>
            },
            {
                path: 'cart',
                element: <PrivateRoute>
                    <Cart></Cart>
                </PrivateRoute>
            },
            {
                path: 'payment',
                element: <PrivateRoute>
                    <Payment></Payment>
                </PrivateRoute>
            },
            {
                path: 'paymentHistory',
                element: <PrivateRoute>
                    <PaymentHistory />
                </PrivateRoute>
            },

            //admin routes
            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome></AdminHome>
                </AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute>
                    <AddItems></AddItems>
                </AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute>
                    <ManageItems></ManageItems>
                </AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute>
                    <UpdateItem></UpdateItem>
                </AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-314utzixd-sumsuzzohas-projects.vercel.app/menu/${params.id}`)
            },
            {
                path: 'users',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            }
        ]
    }
]);