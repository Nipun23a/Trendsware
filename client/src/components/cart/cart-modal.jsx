import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Gift, ShoppingBasket, Frown } from 'lucide-react';
import { Card } from '../ui/Card';
import ProductImage from '../../assets/images/products/tshirt.png';

const CartModal = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Sample Product", price: 99.99, quantity: 1, size: "M", image: ProductImage }
    ]);

    const increaseQuantity = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            )
        );
    };

    const removeItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Cart Modal */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-4 border-b flex justify-end">
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-100 rounded-full"
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Card key={item.id} className="border border-gray-200">
                                <div className="flex gap-4 p-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-blue-950 font-montserrat">{item.name}</h3>
                                        <p className="text-sm text-gray-500 font-montserrat">Size: {item.size}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => decreaseQuantity(item.id)} className="p-1 hover:bg-gray-100 rounded ">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="p-1 hover:bg-gray-100 rounded">
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 font-montserrat text-center">
                            <Frown className="h-16 w-16 mb-4" />
                            <p>Your cart is empty</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t p-4 bg-gray-50">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium font-montserrat">Total</span>
                            <span className="font-semibold font-montserrat">${calculateTotal()}</span>
                        </div>
                        <button
                            type="submit"
                            className="mt-5 w-full p-3 text-white bg-blue-950 rounded-md
                        hover:bg-blue-900 transition-all duration-300
                        font-montserrat font-bold flex items-center justify-center gap-2
                        shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <ShoppingBasket className="w-5 h-5" />
                            View Basket
                        </button>
                        <button
                            type="submit"
                            className="mt-5 w-full p-3 text-white bg-blue-950 rounded-md
                        hover:bg-blue-900 transition-all duration-300
                        font-montserrat font-bold flex items-center justify-center gap-2
                        shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Gift className="w-5 h-5" />
                            Confirm Order
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartModal;


