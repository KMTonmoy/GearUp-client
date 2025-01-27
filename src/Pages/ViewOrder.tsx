import { useEffect, useState } from 'react';

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

interface OrderItem {
    _id: string;
    email: string;
    orderId: string;
    products: Array<{ productId: string; quantity: number }>;
    status: string;
    date: string;
}

const ViewOrder = () => {
    const { email, role } = useUserRole();



    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    console.log(role,
        products)
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartResponse = await fetch(`https://gearupserver.vercel.app/api/mycartall`);
                const cartData = await cartResponse.json();
                const filteredCartItems = cartData.data.filter((item: CartItem) => item.email === email);

                const productResponse = await fetch(`https://gearupserver.vercel.app/api/products`);
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

        const fetchOrdersData = async () => {
            try {
                const ordersResponse = await fetch(`https://gearupserver.vercel.app/api/payments`);
                const ordersData = await ordersResponse.json();


                const filteredOrders = ordersData.filter((order: OrderItem) => order?.email === email);


                setOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartData();
        fetchOrdersData();
    }, [email]);

    return (
        <div className="p-6 w-full bg-gray-100 min-h-screen">




            {/* Loading indicator */}
            {isLoading ? (
                <div className="text-center text-lg text-gray-500">Loading your data...</div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <p className="text-gray-500">You have no orders yet.</p>
                        ) : (
                            <div>
                                {
                                    orders.map(order =>
                                        <>
                                            <div>
                                                Product Id:  {order._id}

                                            </div>


                                        </>

                                    )
                                }



                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Cart</h2>
                <div className="space-y-4">
                    {cartItems.map((item) => (
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

export default ViewOrder;
