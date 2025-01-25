import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Bicycle {
    _id: string;
    name: string;
    brand: string;
    model: string;
    price: number;
    category: string;
    image: string;
}

const FeaturedBicycles: React.FC = () => {
    const [bicycles, setBicycles] = useState<Bicycle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBicycles = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setBicycles(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bicycles:', error);
                setLoading(false);
            }
        };

        fetchBicycles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const featuredBicycles = bicycles.slice(0, 6);

    return (
        <div className="featured-bicycles my-8 px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">Featured Bicycles</h2>
            <div className="bicycles-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBicycles.map((data) => (
                    <div key={data._id} className="bicycle-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img className="w-full h-48 object-cover rounded-md mb-4" src={data.image} alt={data.name} />
                        <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
                        <p className="text-gray-600 mb-2"><strong>Brand:</strong> {data.brand}</p>
                        <p className="text-gray-600 mb-2"><strong>Model:</strong> {data.model}</p>
                        <p className="font-semibold text-lg mb-2"><strong>Price:</strong> ${data.price}</p>
                        <p className="text-gray-600 mb-4"><strong>Category:</strong> Bicycle  </p>
                        <Link
                            to={`/bicycle/${data._id}`}
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center my-10">
                <Link to="/shop">
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors">
                        View All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedBicycles;
