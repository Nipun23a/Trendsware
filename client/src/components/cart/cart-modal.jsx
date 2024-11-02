import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Card } from '../ui/Card';

const CartModal = ({ isOpen, onClose }) => {
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
                <div className="p-4 border-b flex justify-between items-center bg-[#BAD7F2]">
                    <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-100 rounded-full"
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <Card className="border border-gray-200">
                        <div className="flex gap-4 p-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg">
                                <img
                                    src="/api/placeholder/80/80"
                                    alt="Product"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium">Sample Product</h3>
                                <p className="text-sm text-gray-500">Size: M</p>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center space-x-2">
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center">1</span>
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button className="text-red-500 hover:text-red-600">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Footer */}
                <div className="border-t p-4 bg-gray-50">
                    <div className="flex justify-between mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-semibold">$99.99</span>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors">
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartModal;
