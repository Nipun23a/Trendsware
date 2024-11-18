import React from 'react';
import { User, MapPin, Package, DollarSign } from 'lucide-react';

// Order Detail Modal Component
const OrderDetailModal = ({ order, showModal, onClose }) => {
    if (!showModal || !order) return null;

    const {
        transactionCode,
        createdAt,
        status,
        customer,
        shippingAddress,
        product,
        totalAmount,
    } = order;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-montserrat">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    {/* Transaction Info */}
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Package className="w-5 h-5 mr-2 text-blue-600" />
                            <h3 className="text-lg font-semibold text-blue-600">Transaction Details</h3>
                        </div>
                        <p className="text-sm">Transaction Code: {transactionCode}</p>
                        <p className="text-sm">Date: {new Date(createdAt).toLocaleString()}</p>
                        <p className="text-sm">Status:
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                {
                                    'pending': 'bg-yellow-100 text-yellow-800',
                                    'completed': 'bg-green-100 text-green-800',
                                    'shipped': 'bg-blue-100 text-blue-800',
                                    'delivered': 'bg-purple-100 text-purple-800',
                                    'cancelled': 'bg-red-100 text-red-800',
                                }[status]
                            }`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        </p>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-600">Customer Info</h3>
                        </div>
                        <p className="text-sm">Name: {customer?.firstName} {customer?.lastName}</p>
                        <p className="text-sm">Telephone: {customer?.telephone}</p>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-600">Shipping Address</h3>
                        </div>
                        <p className="text-sm">Address Line 1: {shippingAddress?.addressLine1}</p>
                        <p className="text-sm">City: {shippingAddress?.city}</p>
                        <p className="text-sm">Postal Code: {shippingAddress?.postalCode}</p>
                    </div>

                    {/* Product Details */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <Package className="w-5 h-5 mr-2 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-600">Products</h3>
                        </div>
                        {product.map((item, index) => (
                            <p key={index} className="text-sm">
                                {item.productName} (x{item.quantity})
                            </p>
                        ))}
                    </div>

                    {/* Total Amount */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                            <h3 className="text-lg font-semibold text-blue-600">Total Amount</h3>
                        </div>
                        <p className="text-lg font-bold">${totalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailModal;
