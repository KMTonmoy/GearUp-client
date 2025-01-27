import { useState, useEffect } from 'react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        "https://www.panoramaresort.com/assets/Bike-Park/PMR-mtb-june29-131-2000__FocusFillWzE4MDAsMTA4MCwieSIsNjBd.jpg",
        "https://www.elite-wheels.com/wp-content/uploads/2023/08/Gravel-Bike-Cover.jpg",
        "https://i0.wp.com/theinscribermag.com/wp-content/uploads/2023/12/Elektrofahrrad_Riemenantrieb_E-Bike_02.jpg",
        "https://vauxbicycle.com/wp-content/uploads/2024/08/faq-Banner.jpg",
        "https://respark.iitm.ac.in/wp-content/uploads/2019/08/A-start-up-reimagining.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const faqs = [
        {
            question: "What types of bicycles do you sell?",
            answer: "We offer a wide range of bicycles, including Mountain, Road, Hybrid, BMX, and Electric bicycles. Each type is designed for different types of riders and terrains.",
        },
        {
            question: "Do you offer free shipping?",
            answer: "Yes, we offer free shipping on all orders over $100 within the continental United States.",
        },
        {
            question: "Can I return a bicycle if it doesn’t fit?",
            answer: "Yes, we offer a 30-day return policy on bicycles. If the bicycle doesn't fit or isn't what you expected, you can return it for a full refund or exchange.",
        },
        {
            question: "Do you have a warranty on your bicycles?",
            answer: "All of our bicycles come with a 1-year warranty covering manufacturing defects. Additional warranties may be available for certain models.",
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has shipped, you will receive a tracking number via email. You can track your order directly on our website or through the shipping carrier’s website.",
        },
        {
            question: "Do you offer financing options?",
            answer: "Yes, we offer financing options through third-party providers. You can check out our financing partners at checkout.",
        },
    ];

    const handleToggle = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 relative">
                    <img
                        src={images[currentImageIndex]}
                        alt="Bicycle"
                        className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-500 ease-in-out opacity-90 hover:opacity-100"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-6">
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => handleToggle(index)}
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                                </div>
                                {activeIndex === index && (
                                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
