import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaProductHunt, FaShoppingCart, FaUserCog, FaBoxOpen, FaHome } from 'react-icons/fa';
import useUserRole from '../../hook/useUserRole';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { role } = useUserRole();
    console.log(role);

    return (
        <>
            <button className="lg:hidden p-4" onClick={toggleSidebar}>
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </button>

            <div className="flex">
                {/* Overlay for small screens */}
                <div
                    className={`fixed inset-0 bg-gray-900 bg-opacity-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
                    onClick={toggleSidebar}
                ></div>

                {/* Sidebar */}
                <div
                    className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : '-translate-x-full'} lg:translate-x-0 lg:w-64`}
                >
                    {/* Sidebar header */}
                    <div className="flex justify-between items-center p-4 bg-gray-900">
                        <h2 className="text-xl font-bold capitalize">{role} Dashboard</h2>
                        <button onClick={toggleSidebar} className="lg:hidden text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar Links */}
                    <nav className="space-y-4 px-4 py-6">

                        <Link
                            to="/"
                            className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                        >
                            <FaHome className="mr-3" /> Home
                        </Link>
                        {/* Admin Links */}
                        {role === 'admin' && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaTachometerAlt className="mr-3" /> Admin Dashboard
                                </Link>
                                <Link
                                    to="/dashboard/users"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaUsers className="mr-3" /> Manage Users
                                </Link>
                                <Link
                                    to="/dashboard/products"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaProductHunt className="mr-3" /> Manage Products
                                </Link>
                                <Link
                                    to="/dashboard/orders"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaShoppingCart className="mr-3" /> Manage Orders
                                </Link>
                            </>
                        )}

                        {/* Customer Links */}
                        {role === 'customer' && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaTachometerAlt className="mr-3" /> User Dashboard
                                </Link>
                                <Link
                                    to="/dashboard/profile"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaUserCog className="mr-3" /> Profile Settings
                                </Link>
                                <Link
                                    to="/dashboard/orders"
                                    className="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
                                >
                                    <FaBoxOpen className="mr-3" /> View Orders
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
