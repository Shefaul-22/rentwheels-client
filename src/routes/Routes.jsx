
import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import BrowseCars from "../components/BrowseCars/BrowseCars";
import PrivateRoute from "../provider/PrivateRoute";
import AddCar from "../components/AddCar/AddCar";
import CarDetails from "../components/CarDetails/CarDetails";
import MyBookings from "../components/MyBookings/MyBookings";
import MyListings from "../components/MyListings/MyListings";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import NewestCars from "../components/NewestCars/NewestCars";

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

            },
            {
                path: "addCar",
                element: <PrivateRoute><AddCar></AddCar></PrivateRoute>
            },
            {
                path: "carDetails/:id",
                element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>

            },
            {
                path: "myBookings",
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            },

            {
                path: "myListings",
                element: <PrivateRoute><MyListings></MyListings></PrivateRoute>
            },
            {
                path:"newestCars",
                element:<NewestCars></NewestCars>
            }

        ]

    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }

])
export default router;
