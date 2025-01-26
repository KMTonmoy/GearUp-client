import React, { useEffect, useState } from 'react';
import useUserRole from '../hook/useUserRole';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import CheckoutForm from '../Components/Payment/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
    'pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33'
);


interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    model: string;
}

interface CartItem {
    _id: string;
    email: string;
    productId: string;
    quantity: number;
    productName?: string;
    productImage?: string;
    productModel?: string;
    price?: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showCheckout, setShowCheckout] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { email } = useUserRole();

    const totalCost = cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * item.quantity,
        0
    );
    const deliveryCharge = cartItems.reduce((acc, item) => acc + item.quantity * 5, 0);
    const grandTotal = totalCost + deliveryCharge;

    useEffect(() => {
        const fetchCartData = async () => {
            try {
 
                const paymentRes = await fetch(`http://localhost:5000/api/payments`);

                console.log(paymentRes)


                const cartResponse = await fetch(`http://localhost:5000/api/mycartall`);

                const cartData: { data: CartItem[] } = await cartResponse.json();
                const filteredCartItems = cartData.data.filter((item) => item.email === email);
  
                const productResponse = await fetch(`http://localhost:5000/api/products`);
                const productData: { data: Product[] } = await productResponse.json();

                const enrichedCartItems = filteredCartItems.map((cartItem) => {
                    const product = productData.data.find((p) => p._id === cartItem.productId);
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

    useEffect(() => {
        const checkStripeLoaded = async () => {
            const stripeLoaded = await stripePromise;
            if (stripeLoaded) {
                setLoading(false);
            }
        };

        checkStripeLoaded();
    }, []);


 
    const handleRemove = async (productId: string) => {
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmed.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/mycart/${productId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (data.success) {
                    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
                    toast.success('Item removed from cart');
                } else {
                    toast.error('Failed to remove item');
                }
            } catch (error) {
                toast.error('Error removing item');
            }
        }
    };

    const handlePlaceOrder = () => {
        setShowCheckout(true);
    };

    const closeModal = () => {
        setShowCheckout(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">Your cart is empty.</div>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col md:flex-row items-center justify-between border-b py-6 gap-4 md:gap-8"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                                />
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800">{item.productName}</h2>
                                    <p className="text-sm text-gray-500">Model: {item.productModel}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-blue-600 underline">
                                        <Link to={`/shop/${item.productId}`}>View Product</Link>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-xl font-bold text-gray-900">${(item.price || 0) * item.quantity}</span>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    <FaTrashAlt size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-gray-700">Subtotal:</span>
                            <span className="text-lg font-semibold text-gray-800">${totalCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-gray-700">Delivery Charge:</span>
                            <span className="text-lg font-semibold text-gray-800">${deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                            <span>Grand Total:</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            className="bg-orange-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-orange-500 transition-all text-lg"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}

            {showCheckout && !loading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <button onClick={closeModal} className="text-red-500 absolute top-4 right-4 text-2xl">
                            &times;
                        </button>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                productIds={cartItems}
                                totalCost={totalCost}
                                grandTotal={grandTotal}
                                email={email}
                            />
                        </Elements>
                    </div>
                </div>
            )}

            {showCheckout && loading && (
                <div className="text-center text-gray-500">Loading Stripe...</div>
            )}
        </div>
    );
};

export default Cart;
