import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, ShoppingCart, Lock, User, MapPin, Phone } from 'lucide-react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Customer Information State
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        telephone: '',
    });

    // Payment Information State
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
    });

    const productPrice = 49.99;
    const total = (productPrice * quantity).toFixed(2);

    const handleCustomerInfoChange = (e) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentInfoChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        // Validate customer information
        const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'telephone'];
        const missingFields = requiredFields.filter(field => !customerInfo[field]);

        if (missingFields.length > 0) {
            setError('Please fill in all required fields');
            setProcessing(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/create-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total,
                    customer: customerInfo,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                window.location.href = '/success';
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
        }
        setProcessing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-blue-950 mb-8 font-libre">Checkout</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Customer Information Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-950 font-montserrat">
                                    <User className="w-5 h-5 mr-2 text-blue-950" />
                                    Customer Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={customerInfo.firstName}
                                            onChange={handleCustomerInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-blue-950 font-montserrat">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={customerInfo.lastName}
                                            onChange={handleCustomerInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                        Address *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={customerInfo.address}
                                        onChange={handleCustomerInfoChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={customerInfo.city}
                                            onChange={handleCustomerInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            Postal Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={customerInfo.postalCode}
                                            onChange={handleCustomerInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                        Telephone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={customerInfo.telephone}
                                        onChange={handleCustomerInfoChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Payment Information Section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-950 font-montserrat">
                                    <CreditCard className="w-5 h-5 mr-2 text-blue-950" />
                                    Payment Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                        Card Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={paymentInfo.cardNumber}
                                        onChange={handlePaymentInfoChange}
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full p-2 border rounded-md"
                                        maxLength="16"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            Expiry Month *
                                        </label>
                                        <select
                                            name="expiryMonth"
                                            value={paymentInfo.expiryMonth}
                                            onChange={handlePaymentInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        >
                                            <option value="">MM</option>
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const month = (i + 1).toString().padStart(2, '0');
                                                return <option key={month} value={month}>{month}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            Expiry Year *
                                        </label>
                                        <select
                                            name="expiryYear"
                                            value={paymentInfo.expiryYear}
                                            onChange={handlePaymentInfoChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        >
                                            <option value="">YYYY</option>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = (new Date().getFullYear() + i).toString();
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-blue-950 font-montserrat mb-2">
                                            CVC *
                                        </label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            value={paymentInfo.cvc}
                                            onChange={handlePaymentInfoChange}
                                            placeholder="123"
                                            className="w-full p-2 border rounded-md"
                                            maxLength="4"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-6 mb-8">
                                <h2 className="text-xl font-semibold mb-4 text-blue-950 font-montserrat">Order Summary</h2>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-950 font-montserrat">Subtotal ({quantity} items)</span>
                                    <span className="font-semibold text-blue-950 font-montserrat">${total}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-blue-950 font-montserrat">Shipping</span>
                                    <span className="text-green-600 font-montserrat">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold mt-4 font-montserrat text-blue-950 ">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-montserrat
                  ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {processing ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5 mr-2" />
                                        Pay ${total} Securely
                                    </>
                                )}
                            </button>

                            <div className="mt-4 flex items-center justify-center text-sm text-gray-500 font-montserrat">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                <span>Secure payment powered by Stripe</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckoutPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CheckoutPage;