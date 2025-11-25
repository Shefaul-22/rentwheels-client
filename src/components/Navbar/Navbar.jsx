import React, { use } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Swal from 'sweetalert2';


const Navbar = () => {

    const { user, signOutUser } = use(AuthContext);
    // console.log(user)

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: "Signed Out!",
                    text: "You have signed out successfully.",
                    icon: "success",
                    confirmButtonColor: "#6366F3",
                });
            })
            .catch(error => {
                console.log(error);

                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            })
    }

    const links = <>


        <li><NavLink to="/" className={({ isActive }) =>
            `btn btn-primary mr-3 mb-2 ${isActive ? "!bg-yellow-500 " : ""}`}>Home</NavLink></li>
        <li><NavLink to="/browseCars" className={({ isActive }) =>
            `btn btn-primary mr-3 mb-2 ${isActive ? "!bg-yellow-500 " : ""}`}>Browse Cars</NavLink></li>

        <li><NavLink to="/addCar" className={({ isActive }) =>
            `btn btn-primary mr-3 mb-2 ${isActive ? "!bg-yellow-500 " : ""}`}>
            Add Car</NavLink></li>

        {
            user && <>

                <li><NavLink to="/myBookings" className={({ isActive }) =>
                    `btn btn-primary mr-3 mb-2 ${isActive ? "!bg-yellow-500 " : ""}`}>My Bookings</NavLink></li>

                <li><NavLink to="/myListings" className={({ isActive }) =>
                    `btn btn-primary mr-3 mb-2 ${isActive ? "!bg-yellow-500 " : ""}`}>My Listings</NavLink></li>
            </>
        }

    </>

    return (
        <div className="navbar bg-base-100 shadow-sm bg-gradient-to-r from-[#537596] to-[#1d7971] fixed top-0 left-0 w-full z-50 px-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-[100] mt-3 w-52 p-2 shadow mb-3">

                        {
                            links
                        }

                    </ul>
                </div>
                <div className='flex justify-center items-center gap-1 '>
                    <img className='w-12 h-12 rounded-full ml-4' src="https://i.ibb.co.com/HTKvwr6c/rentcarlogoimage.jpg" alt="Rentwheels Logo" />
                    <a className=" text-2xl md:text-3xl font-bold text-white">Rent<span className='text-yellow-300 font-bold'>Wheels</span></a>
                </div>
            </div>
            <div className="navbar-center ml-15 hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {
                        links
                    }
                </ul>
            </div>
            {/* <div className="navbar-end">
                {
                    user ? <a onClick={handleSignOut} className="btn btn-primary">Sign Out</a> :
                        <Link to='/login' className='btn btn-primary'>Login</Link>
                }
            </div> */}


            <div className="navbar-end">

                {user ? (
                    <div className="dropdown dropdown-end">


                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="User"
                                    src={user.photoURL? user.photoURL : "https://i.ibb.co.com/JWv2ftcD/usericon.jpg"}
                                />
                            </div>
                        </label>

                        {/* photo click dropdown here */}
                        <ul
                            tabIndex={0}
                            className="mt-3 z-50 p-4 shadow-xl menu menu-sm dropdown-content bg-base-200 rounded-xl w-60"
                        >

                            <li className="flex flex-col items-start pb-3 border-b mb-3">
                                <span className="text-lg font-semibold">
                                    {user.displayName || "User"}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {user.email}
                                </span>
                            </li>


                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="btn btn-error btn-sm w-full text-white"
                                >
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                )}

            </div>

        </div>
    );
};

export default Navbar;