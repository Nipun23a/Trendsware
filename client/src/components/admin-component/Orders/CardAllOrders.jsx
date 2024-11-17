import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusUpdateModal from "../Modal/StatusUpdateModal";
import OrderDetailModal from "../Modal/OrderDetailModal";
import { Loader2, Eye } from 'lucide-react';
import axios from 'axios';

const CardAllOrders = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders?populate=user,product.product`);
            setOrders(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setShowDetailModal(true);
    };

    const handleStatusClick = (order) => {
        setSelectedOrder(order);
        setShowStatusModal(true);
    };

    const handleConfirmStatusUpdate = async (newStatus) => {
        try {
            setLoading(true);
            await axios.patch(`${process.env.REACT_APP_API_URL}/orders/${selectedOrder._id}/status`, {
                status: newStatus
            });

            // Update local state
            const updatedOrders = orders.map((order) =>
                order._id === selectedOrder._id
                    ? { ...order, status: newStatus }
                    : order
            );
            setOrders(updatedOrders);
            setShowStatusModal(false);
            setSelectedOrder(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'completed': 'bg-green-100 text-green-800',
            'shipped': 'bg-blue-100 text-blue-800',
            'delivered': 'bg-purple-100 text-purple-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading && orders.length === 0) {
        return (
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-black">
                                All Orders
                            </h3>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 text-red-500 text-center">
                        {error}
                    </div>
                )}

                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Transaction Code
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Customer
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Products
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Total Amount
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Status
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Date
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                        {order.transactionCode}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {order.user.name}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {order.product.map((item, index) => (
                                            <div key={index}>
                                                {item.product.name} (x{item.quantity})
                                                {index < order.product.length - 1 && ', '}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        ${order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <button
                                            className="bg-gray-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            onClick={() => handleViewClick(order)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            onClick={() => handleStatusClick(order)}
                                        >
                                            Update Status
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Status Update Modal */}
            {showStatusModal && (
                <StatusUpdateModal
                    showModal={showStatusModal}
                    onClose={() => setShowStatusModal(false)}
                    onConfirm={handleConfirmStatusUpdate}
                    productName={selectedOrder?.product[0]?.product?.name}
                />
            )}

            {/* Order Detail Modal */}
            {showDetailModal && (
                <OrderDetailModal
                    showModal={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    order={selectedOrder}
                />
            )}
        </>
    );
};

export default CardAllOrders;