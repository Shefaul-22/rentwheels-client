import React from 'react';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <div>Navbar</div>
            <Outlet></Outlet>
            <div>Footer</div>
        </div>
    );
};

export default HomeLayout;