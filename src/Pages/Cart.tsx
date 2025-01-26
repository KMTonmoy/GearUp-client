import React, { useEffect, useState } from 'react';
import useUserRole from '../hook/useUserRole';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface CartItem {
    _id: string;
    email: string;
    productId: string;
    quantity: number;
    productName: string;
    productimage: string;
    productType: string;
    productModel: string;
    __v: number;
    price: number;
    description: string;
}

interface Product {
    _id: string;
    name: string;
    brand: string;
    model: string;
    price: number;
    type: string;
    description: string;
    image: string;
    quantity: number;
    inStock: boolean;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const { email } = useUserRole();
    const deliveryCharge = 60;

    const totalCost = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const grandTotal = totalCost + deliveryCharge;
    useEffect(() => {
        const fetchCartData = async () => {

            const cartResponse = await fetch(`http://localhost:5000/api/mycartall`);
            const cartData = await cartResponse.json();

            const filteredCartItems = cartData.data.filter((item: CartItem) => item.email === email);

            const productResponse = await fetch(`http://localhost:5000/api/products`);
            const productData = await productResponse.json();

            const enrichedCartItems = filteredCartItems.map((cartItem: CartItem) => {
                const product = productData.data.find((p: Product) => p._id === cartItem.productId);
                if (product) {
                    return {
                        ...cartItem,
                        productName: product.name,
                        productimage: product.image,
                        price: product.price,
                        productType: product.type,
                        productModel: product.model,
                        description: product.description,
                    };
                }
                return cartItem
            });

            setCartItems(enrichedCartItems);
            setProducts(productData);


        };

        fetchCartData();
    }, [email]);

    const handleRemove = async (productId: string) => {

        const response = await fetch(`http://localhost:5000/api/mycart/${productId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
            setCartItems(cartItems.filter((item) => item._id !== productId));
        }

    };



    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img
                                    src={item.productimage}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover mr-4"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg">{item.productName}</h2>
                                    <p className="text-sm text-gray-500">{item.productType}</p>
                                    <p className="text-sm text-gray-500">Model: {item.productModel}</p>
                                    <p className="text-sm text-gray-500">Item Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">View Product: <Link to={`/shop/${item.productId}`}>Go</Link></p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xl font-bold">${item.price * item.quantity}</span>

                                <button
                                    className="ml-4 text-red-500"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="flex justify-between mb-4">
                            <span className="text-lg font-semibold text-gray-700">
                                Subtotal:
                            </span>
                            <span className="text-lg font-semibold text-gray-800">
                                {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-lg font-semibold text-gray-700">
                                Delivery Charge:
                            </span>
                            <span className="text-lg font-semibold text-gray-800">
                                ${deliveryCharge.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Grand Total:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-500">
                            Checkout
                        </button>
                    </div>
                </div>



            )
            }
        </div >
    );
};

export default Cart;
