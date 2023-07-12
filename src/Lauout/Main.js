import React from 'react';
import MainNavbar from '../Navbar/MainNavbar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;