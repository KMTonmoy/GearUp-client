import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Banner = () => {
    const slides = [
        {
            img: "https://bikun-store-demo.myshopify.com/cdn/shop/files/slideshowV1-bg1.jpg?v=1664612758",
            title: "Onzo Mountain Pro",
            subtitle: "MOUNTAIN CLIMBER",
        },
        {
            img: "https://bikun-store-demo.myshopify.com/cdn/shop/files/slideshowV1-bg2.jpg?v=1664612758",
            title: "Lightest Gets Lighter",
            subtitle: "ALL-NEW ONZO PRO",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-[60vh] sm:h-[700px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-700 ${currentSlide === index ? 'translate-x-0' : 'translate-x-full'} ${currentSlide === index - 1 || (index === 0 && currentSlide === slides.length - 1) ? '-translate-x-full' : ''}`}
                    style={{ backgroundImage: `url(${slide.img})` }}
                >
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center sm:left-1/4 sm:top-1/4 sm:text-left sm:max-w-lg">
                        <h4 className="text-xl sm:text-2xl font-semibold mb-3">{slide.title}</h4>
                        <h1 className="text-3xl sm:text-5xl font-bold mb-5">{slide.subtitle}</h1>
                        <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors">
                            Shop Now
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full transition-all z-10"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full transition-all z-10"
            >
                <FaChevronRight size={20} />
            </button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-orange-500' : 'bg-gray-300'} transition-all`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;
