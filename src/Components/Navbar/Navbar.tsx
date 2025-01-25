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
                        <Link className='text-[17px] font-[600] hover:text-orange-600 hover:underline' to='/'>Home</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600 hover:underline' to='/shop'>Shop</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600 hover:underline' to='/blogs'>Blogs</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600 hover:underline' to='/contact'>Contact Us</Link>
                    </div>

                    {/* Icons */}
                    <div className='flex gap-5 items-center'>
                        <Link className='text-[27px] font-[600] hover:text-orange-600' to='/search'>
                            <IoSearchOutline />
                        </Link>
                        <Link className='text-[27px] font-[600] hover:text-orange-600' to='/profile'>
                            <FaRegUser />
                        </Link>
                        <Link className='text-[27px] font-[600] hover:text-orange-600' to='/cart'>
                            <LuShoppingBag />
                        </Link>

                        {/* Hamburger menu for smaller screens */}
                        <button className='md:hidden text-[27px] hover:text-orange-600' onClick={toggleMenu}>
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
                        <button onClick={toggleMenu} className='text-[27px] hover:text-orange-600'>
                            <IoClose />
                        </button>
                    </div>
                    <div className='flex flex-col gap-6 px-4 py-6'>
                        <Link className='text-[17px] font-[600] hover:text-orange-600' to='/' onClick={toggleMenu}>Home</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600' to='/shop' onClick={toggleMenu}>Shop</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600' to='/blogs' onClick={toggleMenu}>Blogs</Link>
                        <Link className='text-[17px] font-[600] hover:text-orange-600' to='/contact' onClick={toggleMenu}>Contact Us</Link>
                        <Link className='flex items-center text-[17px] font-[600] hover:text-orange-600' to='/profile' onClick={toggleMenu}>
                            <FaRegUser className='mr-2' /> Login
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
