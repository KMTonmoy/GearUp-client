'use client';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ productIds, grandTotal, email }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);


    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (grandTotal > 0) {
            fetch('https://gearupback.vercel.app/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    price: grandTotal,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setClientSecret(data.clientSecret);
                })
                .catch(error => {
                    console.error('Error fetching client secret:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Payment Initialization Failed',
                        text: 'Unable to proceed with payment. Please try again later.',
                    });
                });
        }
    }, [grandTotal, email, productIds]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        setLoading(true);
        const { error: paymentError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            setLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: email || 'anonymous',
                    name: email || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            console.log('Payment successful, transaction ID:', paymentIntent.id);


            // Save Payment
            fetch('https://gearupback.vercel.app/api/save-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    orderdProducts: productIds, 
                    price: grandTotal,
                    transactionId: paymentIntent.id,
                    paymentStatus: 'succeeded',
                }),
            })
                .then(response => response.json())
                .then(() => {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: 'Thank you for your payment.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });



        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="rounded-2xl">
            <CardElement
                className="w-[450px]"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#F43F5E',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                className="w-[100px] h-[40px] flex items-center justify-center mx-auto bg-[#F43F5E] text-white font-semibold rounded-md shadow-md transition-transform duration-200 transform hover:scale-105 active:scale-95 my-4"
                type="submit"
                disabled={loading || !stripe || !clientSecret}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>

            {transactionId && (
                <p className="text-green-600">Your transaction ID: {transactionId}</p>
            )}
        </form>
    );
};

export default CheckoutForm;
