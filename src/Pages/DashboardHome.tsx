import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaShoppingCart, FaProductHunt, FaChartLine } from 'react-icons/fa';
import useUserRole from '../hook/useUserRole';

interface CartItem {
    _id: string;
    productId: string;
    email: string;
    quantity: number;
    productName: string;
    price: number;

}

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    model: string;
    productName: string;
}

const DashboardHome = () => {
    const { email, role } = useUserRole();
    const [cartItem, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartResponse = await fetch(`http://localhost:5000/api/mycartall`);
                const cartData = await cartResponse.json();
                const filteredCartItems = cartData.data.filter((item: CartItem) => item.email === email);

                const productResponse = await fetch(`http://localhost:5000/api/products`);
                const productData = await productResponse.json();

                setProducts(productData.data);

                const enrichedCartItems = filteredCartItems.map((cartItem: CartItem) => {
                    const product = productData.data.find((p: Product) => p._id === cartItem.productId);
                    if (product) {
                        return {
                            ...cartItem,
                            productName: product.name,
                            productImage: product.image,
                            price: product.price,
                            productModel: product.model,
                        };
                    }
                    return cartItem;
                });

                setCartItems(enrichedCartItems);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, [email]);

    return (
        <div className="p-6 w-full bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                        <p className="text-2xl text-gray-900">150</p>
                    </div>
                    <FaBoxOpen className="text-4xl text-blue-500" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Items in Cart</h3>
                        <p className="text-2xl text-gray-900">{cartItem.length}</p>
                    </div>
                    <FaShoppingCart className="text-4xl text-green-500" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">Products</h3>
                        <p className="text-2xl text-gray-900">{products.length}</p>
                    </div>
                    <FaProductHunt className="text-4xl text-orange-500" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-100 p-4 rounded-lg text-center cursor-pointer hover:bg-blue-200 transition">
                        <h4 className="text-xl font-semibold text-blue-600">View Orders</h4>
                        <FaBoxOpen className="text-3xl text-blue-500 mx-auto" />
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg text-center cursor-pointer hover:bg-green-200 transition">
                        <h4 className="text-xl font-semibold text-green-600">Add to Cart</h4>
                        <FaShoppingCart className="text-3xl text-green-500 mx-auto" />
                    </div>
                    {role === 'admin' ? (
                        <>
                            <div className="bg-yellow-100 p-4 rounded-lg text-center cursor-pointer hover:bg-yellow-200 transition">
                                <h4 className="text-xl font-semibold text-yellow-600">Manage Products</h4>
                                <FaProductHunt className="text-3xl text-yellow-500 mx-auto" />
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg text-center cursor-pointer hover:bg-purple-200 transition">
                                <h4 className="text-xl font-semibold text-purple-600">Analytics</h4>
                                <FaChartLine className="text-3xl text-purple-500 mx-auto" />
                            </div>
                        </>
                    ) : null}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Order #12345</h3>
                            <p className="text-sm text-gray-500">Placed on: Jan 20, 2025</p>
                        </div>
                        <span className="text-green-500 font-semibold">Delivered</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Order #12346</h3>
                            <p className="text-sm text-gray-500">Placed on: Jan 22, 2025</p>
                        </div>
                        <span className="text-yellow-500 font-semibold">Processing</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Cart</h2>
                <div className="space-y-4">
                    {cartItem.map((item) => (
                        <div key={item._id} className="flex justify-between items-center border-b pb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">{item.productName}</h3>
                                <p className="text-sm text-gray-500">Price: ${item.price}</p>
                            </div>
                            <span className="text-gray-500">Quantity: {item.quantity}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
