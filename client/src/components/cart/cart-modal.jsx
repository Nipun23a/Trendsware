import React, {useContext} from 'react';
import {X, Trash2, Plus, Minus, Gift, ShoppingBasket, ShoppingCart} from 'lucide-react';
import { CartContext } from '../../context/Cart-Context';
import { CustomButton, CustomAlert, CustomAlertDescription, CustomBadge } from '../ui/Custom-Component';
import { useNavigate } from "react-router-dom";

const CartModal = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal
    } = useContext(CartContext);



    const handleClose = () => setIsCartOpen(false);

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

    const  navigate = useNavigate();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 transition-opacity duration-300 z-40
                    ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleClose}
            />

            {/* Cart Modal */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 
                    transform transition-transform duration-300 ease-in-out
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between bg-[#BAD7F2]">
                    <div className="flex items-center gap-2">
                        <ShoppingBasket className="h-6 w-6 text-blue-950" />
                        <h2 className="text-lg font-semibold text-blue-950 font-libre">Your Cart</h2>
                        <CustomBadge variant="secondary" className="ml-2">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                        </CustomBadge>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-blue-900 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6 text-blue-950" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-240px)]">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={`${item.id}-${item.size}`}
                                 className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                <div className="flex gap-4 p-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-blue-950 truncate font-montserrat">{item.name}</h3>
                                                <p className="text-sm text-blue-950 font-montserrat">Size: {item.size}</p>
                                                <p className="font-semibold text-blue-950 mt-1 font-montserrat">
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-red-500 hover:text-red-600 p-1 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity, -1)}
                                                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-10 text-center font-medium font-montserrat">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity, 1)}
                                                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <p className="font-semibold text-blue-950 font-montserrat">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                            <ShoppingCart className="h-16 w-16 mb-4 text-gray-400" />
                            <p className="text-lg font-medium mb-2 font-montserrat text-blue-950">Your cart is empty</p>
                            <p className="text-sm text-gray-400 font-montserrat">Add items to get started</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t bg-gray-50 p-4 space-y-4">
                        {/* Order Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 font-montserrat">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold text-lg text-blue-950 font-montserrat">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Free Shipping Alert */}
                        {cartTotal < 100 && (
                            <CustomAlert variant="info">
                                <CustomAlertDescription>
                                    Add {formatPrice(100 - cartTotal)} more for free shipping!
                                </CustomAlertDescription>
                            </CustomAlert>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <CustomButton
                                className="w-full bg-orange-600 hover:bg-orange-500 text-white h-12 font-semibold"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/cart');
                                }}
                            >
                                <ShoppingBasket className="w-5 h-5 mr-2" />
                                View Cart
                            </CustomButton>
                            <CustomButton
                                className="w-full bg-blue-950 hover:bg-blue-900 text-white h-12 font-semibold"
                                onClick={() => console.log('Proceed to Checkout')}
                            >
                                <Gift className="w-5 h-5 mr-2" />
                                Checkout
                            </CustomButton>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartModal;