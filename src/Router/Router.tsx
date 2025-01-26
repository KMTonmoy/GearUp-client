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
        path: "*",
        element: <>Error 404 Page Dosent Exits</>,
    }

]);