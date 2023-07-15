import React from 'react';
import MainNavbar from '../Navbar/MainNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';

const Main = () => {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;