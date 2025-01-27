import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-[#F3F3F3] py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Social Links */}
                    <div className="flex flex-col gap-3">
                        <h1 className="font-[600] text-[26px]">GearUp</h1>
                        <p className="text-gray-600">
                            Sophisticated simplicity for the independent mind.
                        </p>
                        <div className="flex gap-5 text-gray-600 text-[20px]">
                            <Link to={'/'} className="hover:text-orange-600 transition-colors">
                                <FaTwitter />
                            </Link>
                            <Link to={'/'} className="hover:text-orange-600 transition-colors">
                                <FaFacebook />
                            </Link>
                            <Link to={'/'} className="hover:text-orange-600 transition-colors">
                                <FaInstagram />
                            </Link>
                            <Link to={'/'} className="hover:text-orange-600 transition-colors">
                                <FaTelegram />
                            </Link>
                        </div>
                    </div>

                    {/* Help & Information */}
                    <div>
                        <h1 className="text-[18px] text-black font-[600] mb-3">Help & Information</h1>
                        <div className="flex flex-col gap-3">
                            {['Support Center', 'Delivery & Returns', 'Terms & Conditions', 'Products Return', 'Wholesale Policy'].map((item, index) => (
                                <a
                                    href="/"
                                    key={index}
                                    className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Shop */}
                    <div>
                        <h1 className="text-[18px] text-black font-[600] mb-3">Quick Shop</h1>
                        <div className="flex flex-col gap-3">
                            {['Pagination', 'About Us', 'Contact Us', 'Investors Site', 'Term of use'].map((item, index) => (
                                <a
                                    href="/"
                                    key={index}
                                    className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h1 className="text-[18px] text-black font-[600] mb-3">Categories</h1>
                        <div className="flex flex-col gap-3">
                            {['Cyclocross Bikes', 'Electric Road Bikes', 'Gravel Bikes', 'Road Bikes', 'Road Framesets'].map((item, index) => (
                                <a
                                    href="/"
                                    key={index}
                                    className="text-gray-600 hover:text-orange-600 transition-colors relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} GearUp. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;
