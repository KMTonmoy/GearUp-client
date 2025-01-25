import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl min-h-[100vh] mx-auto '>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;