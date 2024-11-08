import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusUpdateModal from "../Modal/StatusUpdateModal";

const CardAllOrders = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([
        {
            id: 1,
            productInfo: { name: 'Product A', sku: 'SKU0123456789', getPrice: 46.53, sellPrice: 50.87 },
            quantity: 10,
            totalPrice: 508.7,
            status: 'Pending'
        },
        {
            id: 2,
            productInfo: { name: 'Product B', sku: 'SKU0123456789', getPrice: 46.53, sellPrice: 46.53 },
            quantity: 5,
            totalPrice: 232.65,
            status: 'Shipped'
        },
        {
            id: 3,
            productInfo: { name: 'Product C', sku: 'SKU0123456789', getPrice: 36.49, sellPrice: 50.87 },
            quantity: 8,
            totalPrice: 406.96,
            status: 'Delivered'
        },
    ]);

    const handleEditClick = (order) => {
        navigate(`/admin/orders/edit/${order.id}`, { state: { order } });
    };

    const handleStatusClick = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleConfirmStatusUpdate = (newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === selectedOrder.id
                ? { ...order, status: newStatus } // Update the status of the selected order
                : order
        );
        setOrders(updatedOrders); // Set the updated orders to reflect the change
        setShowModal(false);
        setSelectedOrder(null);
    };

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
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Order ID
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Product Information
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Quantity
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Total Price
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Order Status
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {order.id}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.productInfo.name} (SKU: {order.productInfo.sku})
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.quantity}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    ${order.totalPrice.toFixed(2)}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {order.status}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button
                                        className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleStatusClick(order)}
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <StatusUpdateModal
                    showModal={showModal} // Ensure showModal is passed correctly
                    onClose={() => setShowModal(false)}
                    onConfirm={(newStatus) => handleConfirmStatusUpdate(newStatus)}
                    productName={selectedOrder.productInfo.name} // Pass the correct product name
                />
            )}
        </>
    );
};

export default CardAllOrders;

