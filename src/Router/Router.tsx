import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import ShopDetails from "../Pages/ShopDetails";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";
import About from "../Pages/About";
import ContactUs from "../Pages/contactus";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/DashboardHome";
import ManageUsers from "../Pages/ManageUsers";
import ManageProducts from "../Pages/ManageProducts";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Signup />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contactus",
                element: <ContactUs />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/shop/:id",
                element: <ShopDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/api/products/${params.id}`),


            },

        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardHome />,
            },
            {
                path: "/dashboard/users",
                element: <ManageUsers />,
            },
            {
                path: "/dashboard/products",
                element: <ManageProducts />,
            },


        ]
    },
    {
        path: "*",
        element: <>Error 404 Page Dosent Exits</>,
    }

]);