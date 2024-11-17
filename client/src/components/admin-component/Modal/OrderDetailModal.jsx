import React, { useState, useEffect } from 'react';
import { User, MapPin, Package, DollarSign } from 'lucide-react';


// Order Detail Modal Component
const OrderDetailModal = ({ order, showModal, onClose }) => {
    if (!showModal || !order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
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
                        <p className="text-sm">Transaction Code: {order.transactionCode}</p>
                        <p className="text-sm">Date: {new Date(order.createdAt).toLocaleString()}</p>
                        <p className="text-sm">Status:
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                {
                                    'pending': 'bg-yellow-100 text-yellow-800',
                                    'completed': 'bg-green-100 text-green-800',
                                    'shipped': 'bg-blue-100 text-blue-800',
                                    'delivered': 'bg-purple-100 text-purple-800',
                                    'cancelled': 'bg-red-100 text-red-800',
                                }[order.status]
                            }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </p>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-600">Customer Information</h3>
                        </div>
                        <p className="text-sm">Name: {order.user.name}</p>
                        <p className="text-sm">Email: {order.user.email}</p>
                    </div>

                    {/* Shipping Address */}
                    <div className="mb-6 bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <MapPin className="w-5 h-5 mr-2 text-green-600" />
                            <h3 className="text-lg font-semibold text-green-600">Shipping Address</h3>
                        </div>
                        <p className="text-sm">{order.shippingAddress.addressLine1}</p>
                        {order.shippingAddress.addressLine2 && (
                            <p className="text-sm">{order.shippingAddress.addressLine2}</p>
                        )}
                        <p className="text-sm">
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                        <p className="text-sm">{order.shippingAddress.country}</p>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                            <h3 className="text-lg font-semibold text-purple-600">Order Items</h3>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {order.product.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm">{item.product.name}</td>
                                        <td className="px-6 py-4 text-sm">{item.quantity}</td>
                                        <td className="px-6 py-4 text-sm">${item.product.price}</td>
                                        <td className="px-6 py-4 text-sm">${(item.quantity * item.product.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-sm font-semibold text-right">Total Amount:</td>
                                    <td className="px-6 py-4 text-sm font-semibold">${order.totalAmount.toFixed(2)}</td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default OrderDetailModal;
