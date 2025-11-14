import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const HomeLayout = () => {
    return (
        <div className='bg-[#BDD7E7] '>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='mt-16'>
                <Outlet></Outlet>
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default HomeLayout;