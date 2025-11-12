
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import BrowseCars from "../components/BrowseCars/BrowseCars";

const router = createBrowserRouter([

    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "browseCars",
                element: <BrowseCars></BrowseCars>

            }

        ]

    }
])
export default router;
