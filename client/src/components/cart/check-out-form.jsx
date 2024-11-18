import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CreditCard, ShoppingCart, Lock, User, Minus, Plus } from 'lucide-react';
import { CartContext } from '../../context/Cart-Context';
import {useContext, useState} from "react";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    // Get cart context
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);

    // Customer Information State
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        shippingAddress: {
            addressLine1: '',
            city: '',
            postalCode: '',
        }
    });

    // Payment Information State
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: '',
    });

    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('shippingAddress.')) {
            const addressField = name.split('.')[1];
            setCustomerInfo(prev => ({
                ...prev,
                shippingAddress: {
                    ...prev.shippingAddress,
                    [addressField]: value
                }
            }));
        } else {
            setCustomerInfo(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePaymentInfoChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleQuantityUpdate = (itemId, size, newQuantity) => {
        updateQuantity(itemId, size, newQuantity);
    };

    const handleRemoveItem = (itemId, size) => {
        removeFromCart(itemId, size);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            setProcessing(false);
            return;
        }

        // Validate customer information
        const requiredFields = ['firstName', 'lastName', 'telephone', 'shippingAddress.addressLine1', 'shippingAddress.city', 'shippingAddress.postalCode'];
        const missingFields = requiredFields.filter(field => {
            const [obj, prop] = field.split('.');
            return !prop ? !customerInfo[obj] : !customerInfo[obj][prop];
        });

        if (missingFields.length > 0) {
            setError('Please fill in all required fields');
            setProcessing(false);
            return;
        }

        try {
            // First, create Stripe payment
            const paymentResponse = await fetch(`${process.env.REACT_APP_API_URL}/create-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: cartTotal,
                    customer: customerInfo,
                    items: cartItems
                }),
            });

            const paymentData = await paymentResponse.json();

            if (paymentData.error) {
                setError(paymentData.error);
                setProcessing(false);
                return;
            }

            // If payment is successful, create order
            const orderResponse = await fetch(`${process.env.REACT_APP_API_URL}/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: cartItems.map(item => ({
                        product: item.id,
                        quantity: item.quantity
                    })),
                    transactionCode: paymentData.paymentIntentId,
                    totalAmount: cartTotal,
                    customer: {
                        firstName: customerInfo.firstName,
                        lastName: customerInfo.lastName,
                        telephone: customerInfo.telephone
                    },
                    shippingAddress: customerInfo.shippingAddress,
                    status: 'pending'
                }),
            });

            const orderData = await orderResponse.json();

            if (orderData.error) {
                setError(orderData.error);
                setProcessing(false);
                return;
            }

            // Redirect to success page
            window.location.href = '/success';
        } catch (err) {
            setError('Order processing failed. Please try again.');
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
                                    <User className="w-5 h-5 mr-2 text-blue-950"/>
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
                                        name="shippingAddress.addressLine1"
                                        value={customerInfo.shippingAddress.addressLine1}
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
                                            name="shippingAddress.city"
                                            value={customerInfo.shippingAddress.city}
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
                                            name="shippingAddress.postalCode"
                                            value={customerInfo.shippingAddress.postalCode}
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
                                    <CreditCard className="w-5 h-5 mr-2 text-blue-950"/>
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
                                            {Array.from({length: 12}, (_, i) => {
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
                                            {Array.from({length: 10}, (_, i) => {
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
                                <h2 className="text-xl font-semibold mb-4 text-blue-950">Order Summary</h2>

                                {cartItems.length === 0 ? (
                                    <div className="text-gray-500 text-center py-4">
                                        Your cart is empty
                                    </div>
                                ) : (
                                    <>
                                        {cartItems.map((item) => (
                                            <div key={`${item.id}-${item.size}`}
                                                 className="flex items-center justify-between py-4 border-b">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-blue-950 font-montserrat">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 font-montserrat">Size: {item.size}</p>
                                                    <p className="text-sm text-gray-600 font-montserrat">${item.price.toFixed(2)} each</p>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityUpdate(item.id, item.size, item.quantity - 1)}
                                                            className="p-1 rounded-md hover:bg-gray-100"
                                                        >
                                                            <Minus className="w-4 h-4"/>
                                                        </button>
                                                        <span
                                                            className="w-8 text-center font-montserrat">{item.quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityUpdate(item.id, item.size, item.quantity + 1)}
                                                            className="p-1 rounded-md hover:bg-gray-100"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item.id, item.size)}
                                                        className="text-red-500 hover:text-red-700 font-montserrat"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-950 font-montserrat">Subtotal</span>
                                                <span className="font-semibold text-blue-950 font-montserrat">
                                                    ${cartTotal.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-950 font-montserrat">Shipping</span>
                                                <span className="text-green-600 font-montserrat">Free</span>
                                            </div>
                                            <div
                                                className="flex justify-between items-center text-xl font-bold mt-4 text-blue-950 font-montserrat">
                                                <span>Total</span>
                                                <span>${cartTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={processing || cartItems.length === 0}
                                className={`w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-montserrat
                                    ${(processing || cartItems.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {processing ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5 mr-2"/>
                                        Pay ${cartTotal.toFixed(2)} Securely
                                    </>
                                )}
                            </button>

                            <div
                                className="mt-4 flex items-center justify-center text-sm text-gray-500 font-montserrat">
                                <ShoppingCart className="w-4 h-4 mr-1"/>
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
            <CheckoutForm/>
        </Elements>
    );
};

export default CheckoutPage;