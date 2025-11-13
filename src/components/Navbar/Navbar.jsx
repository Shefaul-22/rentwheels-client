import React, { use } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';


const Navbar = () => {

    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                alert('Sign Out successfully')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const links = <>
        <li><NavLink to="/" className={`btn btn-primary mr-2`}>Home</NavLink></li>
        <li><NavLink to="/browseCars" className={`btn btn-primary mr-2`}>Browse Cars</NavLink></li>
        <li><NavLink to="/addCar" className={`btn btn-primary mr-2`}>Add Car</NavLink></li>

        {
            user && <>
                
                <li><NavLink to="/myBookings" className={`btn btn-primary mr-2`}>My Bookings</NavLink></li>
                <li><NavLink to="/myListings" className={`btn btn-primary mr-2`}>My Listings</NavLink></li>
            </>
        }

    </>

    return (
        <div className="navbar bg-base-100 shadow-sm mb-4 w-11/12 mx-auto sticky top-1">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                        {
                            links
                        }

                    </ul>
                </div>
                <a className=" text-3xl">Rent<span className='text-primary'>Wheels</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <a onClick={handleSignOut} className="btn btn-primary">Sign Out</a> :
                        <Link to='/login' className='btn btn-primary'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;