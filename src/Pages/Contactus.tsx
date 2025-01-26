import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import useUserRole from '../hook/useUserRole';

const ContactUs = () => {
    const { email } = useUserRole();
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        if (email) {
            setUserName('');
            setUserPhone('');
        }
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please login to send a message.");
            return;
        }

        const formData = new FormData();
        formData.append('name', userName);
        formData.append('email', email);
        formData.append('phone', userPhone);
        formData.append('message', message);


        const response = await fetch('https://formspree.io/f/mldepzqd', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            setFormStatus('Your message has been sent successfully!');
            setUserName('');
            setUserPhone('');
            setMessage('');
            toast.success("Message sent successfully!");
        } else {
            setFormStatus('Failed to send message. Please try again.');
            toast.error("Failed to send the message.");
        }

    };

    return (
        <div className="max-w-7xl mx-auto my-20 px-6">
            <Toaster />
            <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2 flex justify-center items-center">
                    <img
                        src="https://vauxbicycle.com/storage/2024/08/contact-us-banner.jpg"
                        alt="Contact Us"
                        className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        <input
                            type="email"
                            required
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="tel"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            placeholder="Your Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Message"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            rows={4}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-all"
                        >
                            Send Message
                        </button>
                    </form>
                    {formStatus && <p className="text-lg text-center text-gray-700">{formStatus}</p>}
                </div>
            </div>
            <div className="mt-10 text-center">
                <p className="text-lg text-gray-800">Visit us at our store</p>
                <p className="text-gray-600">123 GearUp Street, Bicycle City, Los Angeles</p>
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-6 text-green-600">
                        Our Location
                    </h2>
                    <div className="w-full h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.8827803802!2d-118.74138195907396!3d34.02003924141445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1726633605732!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            allowFullScreen={false}
                            loading="lazy"
                            className="border-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
