import React, { useContext } from 'react';
import { CartContext } from "../../context/Cart-Context";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { CustomButton } from "../ui/Custom-Component";
import { Link } from "react-router-dom";

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
    } = useContext(CartContext);

    const handleQuantityChange = (itemId, size, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) {
            removeFromCart(itemId, size);
        } else {
            updateQuantity(itemId, size, newQuantity);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center space-y-6 max-w-md mx-auto px-4">
                    <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto" />
                    <h1 className="text-2xl font-bole text-blue-950 font-montserrat">Your Cart is Empty</h1>
                    <p className="text-gray-600 font-montserrat">Looks Like You haven't added any items to your cart yet.</p>
                    <Link to="/product">
                        <CustomButton
                            className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-full font-montserrat mt-6"
                        >
                            Continue Shopping
                        </CustomButton>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-8">
                    <Link to="/product" className="flex items-center text-blue-950 hover:text-blue-800">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-medium font-montserrat">Continue Shopping</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-2xl font-bold text-blue-950 mb-6 font-montserrat">Shopping Cart</h1>
                        {cartItems.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden p-6"
                            >
                                <div className="flex gap-6">
                                    <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium text-blue-950 font-montserrat">{item.name}</h3>
                                                <p className="text-gray-500 mt-1 font-montserrat">Size: {item.size}</p>
                                                <p className="font-semibold text-blue-950 mt-2 font-montserrat">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors h-fit"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                                                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-medium font-montserrat">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                                                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-blue-950">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-blue-950 mb-6 font-montserrat">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                                    <span>Shipping</span>
                                    <span>{cartTotal >= 100 ? 'Free' : formatPrice(10)}</span>
                                </div>
                                {cartTotal < 100 && (
                                    <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg font-montserrat">
                                        Add {formatPrice(100 - cartTotal)} more for free shipping!
                                    </div>
                                )}
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-semibold text-lg text-blue-950 font-montserrat">
                                        <span>Total</span>
                                        <span>{formatPrice(cartTotal + (cartTotal >= 100 ? 0 : 10))}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <Link to="/payment">
                                    <CustomButton
                                        className="w-full bg-blue-950 hover:bg-blue-900 text-white h-12 font-semibold rounded-full font-montserrat"
                                        onClick={() => console.log('Proceed to Checkout')}
                                    >
                                        Proceed to Checkout
                                    </CustomButton>
                                </Link>
                                <Link to="/product">
                                    <CustomButton
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-blue-950 h-12 font-semibold rounded-full font-montserrat mt-6"
                                    >
                                        Continue Shopping
                                    </CustomButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
