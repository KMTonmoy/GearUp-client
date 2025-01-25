import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const ShopDetails = () => {
    const loadProduct = useLoaderData();
    const product = loadProduct?.data;
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value > 0 && value <= product.quantity) {
            setSelectedQuantity(value);
        }
    };

    return (
        <div className="max-w-7xl my-20 mx-auto">
             <Helmet>
                 <title>GearUp - {product.name}</title>
             </Helmet>
            {product ? (
                <div className="flex flex-col md:flex-row gap-10 p-6 rounded-lg bg-white shadow-md">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full md:w-1/2 h-auto object-contain rounded-lg"
                    />
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="font-semibold text-2xl text-black">{product.name}</h1>
                            <h3 className="font-semibold text-xl text-orange-600">${product.price}</h3>
                        </div>
                        <hr />
                        <p className="text-gray-700">{product.description}</p>
                        <ul className="text-gray-700 space-y-2">
                            <li>
                                <strong>Brand:</strong> {product.brand}
                            </li>
                            <li>
                                <strong>Model:</strong> {product.model}
                            </li>
                            <li>
                                <strong>Type:</strong> {product.type}
                            </li>
                            <li>
                                <strong>Quantity:</strong> {product.quantity}
                            </li>
                            <li>
                                <strong>In Stock:</strong>{" "}
                                {product.inStock ? (
                                    <span className="text-green-600 font-medium">Yes</span>
                                ) : (
                                    <span className="text-red-600 font-medium">No</span>
                                )}
                            </li>
                        </ul>
                        <div className="flex flex-col gap-4 mt-4">
                            <div>
                                <label htmlFor="quantity" className="block text-gray-700 font-medium">
                                    Select Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                    min={1}
                                    max={product.quantity}
                                    className="border border-gray-300 rounded-lg p-2 mt-1 w-28"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Available: {product.quantity}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all">
                                    Add to Cart
                                </button>
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all">
                                    Buy it Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-xl text-gray-600">Loading product details...</div>
            )}
        </div>
    );
};

export default ShopDetails;
