import React from 'react';
import { FaCaretRight } from "react-icons/fa";

const InfoCards = () => {
    return (
        <div className='flex md:flex-row flex-col gap-5 items-center'>
            <div className="relative w-full sm:w-1/3 h-[300px] bg-cover bg-center transform transition-transform duration-300 ease-in-out hover:scale-110" style={{ backgroundImage: "url(https://bikun-store-demo.myshopify.com/cdn/shop/files/bannerV1-img1.jpg?v=1664587573)" }}>
          <div className="absolute top-1/2 left-35 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
                    <h1 className="text-2xl font-semibold mb-2">Singletrack Speed</h1>
                    <h5 className="text-lg mb-4">The All-New Trance Advanced</h5>
                    <a href="/shop" className="text-white flex items-center hover:text-orange-500 transition-colors">
                        View Collection <FaCaretRight className="ml-2" />
                    </a>
                </div>
            </div>

            <div className="relative w-full sm:w-1/3 h-[300px] bg-cover bg-center transform transition-transform duration-300 ease-in-out hover:scale-110" style={{ backgroundImage: "url(https://bikun-store-demo.myshopify.com/cdn/shop/files/bannerV1-img2.jpg?v=1664587573)" }}>
          <div className="absolute top-1/2 left-35 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
                    <h1 className="text-2xl font-semibold mb-2">Singletrack Speed</h1>
                    <h5 className="text-lg mb-4">The All-New Trance Advanced</h5>
                    <a href="/shop" className="text-white flex items-center hover:text-orange-500 transition-colors">
                        View Collection <FaCaretRight className="ml-2" />
                    </a>
                </div>
            </div>

            <div className="relative w-full sm:w-1/3 h-[300px] bg-cover bg-center transform transition-transform duration-300 ease-in-out hover:scale-110" style={{ backgroundImage: "url(https://bikun-store-demo.myshopify.com/cdn/shop/files/bannerV1-img3.jpg?v=1664587574)" }}>
          <div className="absolute top-1/2 left-35 transform -translate-x-1/2 -translate-y-1/2 text-white text-left">
                    <h1 className="text-2xl font-semibold mb-2">Singletrack Speed</h1>
                    <h5 className="text-lg mb-4">The All-New Trance Advanced</h5>
                    <a href="/shop" className="text-white flex items-center hover:text-orange-500 transition-colors">
                        View Collection <FaCaretRight className="ml-2" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InfoCards;
