 
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto my-20 px-6">
            <Helmet>
                <title>About Us - GearUp Bicycle Shop</title>
            </Helmet>
            <h1 className="text-center text-4xl font-semibold text-black mb-8">Welcome to GearUp Bicycle Shop</h1>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Shop Mission Section */}
                <div className="flex flex-col justify-center items-start md:w-1/2">
                    <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        At GearUp Bicycle Shop, our mission is to provide high-quality bicycles and exceptional service to cycling enthusiasts of all ages. Whether you're looking for a road bike, mountain bike, or a bike for your daily commute, we have something for everyone. We strive to make cycling accessible and enjoyable for all!
                    </p>
                    <p className="text-lg text-gray-700">
                        We are committed to offering not just bicycles but also the expertise and support to ensure you have the best experience. Our knowledgeable staff is here to help you choose the right bike, provide maintenance tips, and offer repairs when needed. Join the GearUp community and experience the joy of cycling!
                    </p>
                </div>

                {/* Shop Values Section */}
                <div className="flex flex-col justify-center items-start md:w-1/2">
                    <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Values</h2>
                    <ul className="text-lg text-gray-700 space-y-4">
                        <li>
                            <strong>Customer Satisfaction:</strong> We prioritize our customers' needs and ensure that they leave happy, whether it's with a new bike, repair service, or advice.
                        </li>
                        <li>
                            <strong>Quality Products:</strong> We offer only the best bicycles and accessories that are built to last and give our customers the best value for their money.
                        </li>
                        <li>
                            <strong>Community Support:</strong> We support our local cycling community by hosting events, offering cycling tips, and promoting a healthy, active lifestyle.
                        </li>
                        <li>
                            <strong>Sustainability:</strong> We believe in the power of bicycles to reduce our carbon footprint and encourage eco-friendly transportation.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Image Section */}
            <div className="mt-12">
                <h2 className="text-center text-3xl font-bold text-orange-600 mb-6">Our Shop</h2>
                <div className="flex justify-center">
                    <img
                        src="https://koronapos.com/wp-content/uploads/2023/07/Image-showing-a-bike-shop_How-to-open-bike-shop-1024x688.png"
                        alt="GearUp Bicycle Shop"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
