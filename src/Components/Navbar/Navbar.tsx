import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuShoppingBag } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='bg-black sticky top-0 w-full z-50'>
            <div className='max-w-7xl mx-auto px-4 md:py-[15px]'>
                <div className='flex justify-between items-center text-white'>
                    {/* Logo */}
                    <h1 className='font-[800] text-[26px]'>GearUp</h1>

                    {/* Links for larger screens */}
                    <div className='hidden md:flex gap-5'>
                        {['Home', 'Shop', 'Blogs', 'Contact Us'].map((item, index) => (
                            <Link
                                key={index}
                                className='text-[17px] font-[600] relative group transition-all duration-300'
                                to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                            >
                                <span className='hover:text-orange-600'>
                                    {item}
                                </span>
                                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className='flex gap-5 items-center'>
                        <Link className='text-[27px] font-[600] hover:text-orange-600 transition-colors duration-300'
                         to='/shop'>
                            <IoSearchOutline />
                        </Link>
                        <Link className='text-[27px] font-[600] hover:text-orange-600 transition-colors duration-300' to='/login'>
                            <FaRegUser />
                        </Link>
                        <Link className='text-[27px] font-[600] hover:text-orange-600 transition-colors duration-300' to='/cart'>
                            <LuShoppingBag />
                        </Link>

                        {/* Hamburger menu for smaller screens */}
                        <button className='md:hidden text-[27px] hover:text-orange-600 transition-colors duration-300' onClick={toggleMenu}>
                            <HiOutlineMenuAlt3 />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className='fixed top-0 right-0 h-full w-[70%] bg-black text-white shadow-lg z-50'
                >
                    <div className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
                        <h1 className='font-[800] text-[26px]'>GearUp</h1>
                        <button onClick={toggleMenu} className='text-[27px] hover:text-orange-600 transition-colors duration-300'>
                            <IoClose />
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 px-4 py-6'>
                        {['Home', 'Shop', 'Blogs', 'Contact Us'].map((item, index) => (
                            <Link
                                key={index}
                                className='text-[17px] font-[600] relative group transition-all duration-300'
                                to={`/${item.replace(/\s+/g, '').toLowerCase()}`}
                                onClick={toggleMenu}
                            >
                                <span className='hover:text-orange-600'>
                                    {item}
                                </span>
                                <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            className='flex items-center text-[17px] font-[600] relative group transition-all duration-300'
                            to='/profile'
                            onClick={toggleMenu}
                        >
                            <FaRegUser className='mr-2' />
                            Login
                            <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
