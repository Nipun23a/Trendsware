import React from 'react';
import { CheckCircle, ShoppingBag, ArrowLeft, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    // You would typically get the order details from your route state or API
    // This is a placeholder that you can replace with actual data
    const orderNumber = `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const orderDate = new Date().toLocaleDateString();

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        {/* Success Header */}
                        <div className="text-center mb-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-blue-950 mb-2 font-libre">Order Confirmed!</h1>
                            <p className="text-gray-600 font-montserrat">
                                Thank you for your purchase. Your order has been received.
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="border rounded-lg p-6 mb-8 bg-gray-50">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500 font-montserrat">Order Number</h2>
                                    <p className="text-lg font-semibold text-blue-950 font-montserrat">{orderNumber}</p>
                                </div>
                                <div className="text-right">
                                    <h2 className="text-sm font-medium text-gray-500 font-montserrat">Order Date</h2>
                                    <p className="text-lg font-semibold text-blue-950 font-montserrat">{orderDate}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h2 className="text-sm font-medium text-gray-500 mb-2 font-montserrat">Order Status</h2>
                                <div className="flex items-center text-green-600">
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    <span className="font-semibold font-montserrat">Processing</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <Link
                                to="/shop"
                                className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-montserrat"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Continue Shopping
                            </Link>

                            <button
                                onClick={() => window.print()}
                                className="w-full flex items-center justify-center bg-white border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors font-montserrat"
                            >
                                <Printer className="w-5 h-5 mr-2" />
                                Print Order Details
                            </button>
                        </div>

                        {/* Additional Information */}
                        <div className="mt-8 text-center text-sm text-gray-500 font-montserrat">
                            <p>A confirmation email has been sent to your email address.</p>
                            <p className="mt-2">
                                If you have any questions, please contact our{' '}
                                <Link to="/support" className="text-blue-600 hover:text-blue-700 underline">
                                    customer support
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;