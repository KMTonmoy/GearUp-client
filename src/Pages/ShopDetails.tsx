import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import useUserRole from "../hook/useUserRole";
import { toast, Toaster } from 'react-hot-toast';

const ShopDetails = () => {
    const { email } = useUserRole();
    const loadProduct = useLoaderData();
    const product = loadProduct?.data;
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (product) {
            setLoading(false);
        }
    }, [product]);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= product.quantity) {
            setSelectedQuantity(value);
        } else {
            setError(`Please enter a value between 1 and ${product.quantity}`);
        }
    };

    const handleAddToCart = async () => {
        const sendData = {
            email,
            productId: product._id,
            productName: product.name,
            productType: product.type,
            productModel: product.model,
            productPrice: product.price,
            ProductImage: product.image,
            quantity: selectedQuantity,
        };

        try {
            const response = await fetch("https://gearupserver.vercel.app/api/mycart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendData),
            });

            const data = await response.json();
            if (response.status === 400) {
                toast.error('Product is already in your cart!');
            } else if (data.success) {
                toast.success("Product added to cart!");
            } else {
                toast.error("Failed to add product to cart.");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Error adding product to cart");
        }
    };

    if (loading) {
        return (
            <div className="text-center text-xl text-gray-600">
                <span>Loading product details...</span>
                <div className="spinner-border text-orange-600 mt-4" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }



    const toastShow = () => {
        toast.error("Please Login to add product to cart");

    }


    return (
        <div className="max-w-7xl my-20 mx-auto">
            <Helmet>
                <title>GearUp - {product.name}</title>
            </Helmet>
            <Toaster></Toaster>
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
                                    aria-label="Select quantity"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Available: {product.quantity}
                                </p>
                                {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                            </div>
                            <div className="flex gap-4">

                                {
                                    email ? (
                                        <button
                                            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all"
                                            onClick={handleAddToCart}
                                            aria-label="Add to cart"
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (

                                        <button
                                            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-all"
                                            aria-label="Add to cart"
                                            onClick={toastShow}
                                        >
                                            Add to Cart
                                        </button>

                                    )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-xl text-gray-600">Product details not found</div>
            )}
        </div>
    );
};

export default ShopDetails;
