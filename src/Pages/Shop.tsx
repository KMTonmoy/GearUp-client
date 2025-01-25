import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

interface Product {
    _id: string;
    name: string;
    brand: string;
    type: string;
    price: number;
    image: string;
    model: string;
}

const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState({
        brand: '',
        category: '',
        priceRange: [0, 2000],
    });
    const [visibleProducts, setVisibleProducts] = useState(9);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    const uniqueBrands = Array.from(new Set(products.map((product) => product.brand)));
    const uniqueCategories = Array.from(new Set(products.map((product) => product.type)));

    const filteredProducts = products.filter((product) => {
        return (
            (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (filters.brand ? product.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true) &&
            (filters.category ? product.type.toLowerCase().includes(filters.category.toLowerCase()) : true) &&
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );
    });

    const handleShowMore = () => setVisibleProducts(visibleProducts + 9);
    const handleShowLess = () => setVisibleProducts(9);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <input
                    type="text"
                    placeholder="Search by brand, name, or category"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-6">
                    <Helmet>
                        <title>GearUp - Shop</title>
                    </Helmet>
                    <div className="flex flex-col items-start">
                        <label className="text-lg font-medium">Price Range</label>
                        {/* <div className="flex gap-4 items-center">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.priceRange[0]}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev, priceRange: [e.target.value, filters.priceRange[1]],
                                }))}
                                className="w-full h-2 bg-orange-400 rounded-full"
                            />
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.priceRange[1]}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev, priceRange: [filters.priceRange[0], e.target.value],
                                }))}
                                className="w-full h-2 bg-orange-400 rounded-full"
                            />
                        </div> */}


                        <div className="flex gap-4 items-center">
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.priceRange[0]}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev, priceRange: [Number(e.target.value), filters.priceRange[1]],
                                }))}
                                className="w-full h-2 bg-orange-400 rounded-full"
                            />
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={filters.priceRange[1]}
                                onChange={(e) => setFilters((prev) => ({
                                    ...prev, priceRange: [filters.priceRange[0], Number(e.target.value)],
                                }))}
                                className="w-full h-2 bg-orange-400 rounded-full"
                            />
                        </div>


                    </div>

                    <div>
                        <select
                            value={filters.brand}
                            onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Brands</option>
                            {uniqueBrands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.slice(0, visibleProducts).map((data) => (
                        <motion.div
                            key={data._id}
                            className="bicycle-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                className="w-full h-48 object-contain rounded-md mb-6"
                                src={data.image}
                                alt={data.name}
                            />

                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{data.name}</h3>
                            <p className="text-gray-600 mb-2"><strong>Brand:</strong> {data.brand}</p>
                            <p className="text-gray-600 mb-2"><strong>Model:</strong> {data.model}</p>
                            <p className="font-semibold text-lg text-gray-800 mb-2"><strong>Price:</strong> ${data.price}</p>
                            <p className="text-gray-600 mb-4"><strong>Category:</strong> {data.type}</p>
                            <Link
                                to={`/shop/${data._id}`}
                                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors"
                            >
                                View Details
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {filteredProducts.length > visibleProducts && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShowMore}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors"
                    >
                        Show More
                    </button>
                </div>
            )}

            {filteredProducts.length <= visibleProducts && visibleProducts > 9 && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShowLess}
                        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition-colors"
                    >
                        Show Less
                    </button>
                </div>
            )}
        </div>
    );
};

export default Shop;
