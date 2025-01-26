import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import ShopDetails from "../Pages/ShopDetails";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Cart from "../Pages/Cart";



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