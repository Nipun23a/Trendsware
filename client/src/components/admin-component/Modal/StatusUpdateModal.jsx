import React, { useState } from "react";

const StatusUpdateModal = ({ showModal, onClose, onConfirm, productName }) => {
    const [status, setStatus] = useState('pending');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleConfirm = () => {
        onConfirm(status);
    };

    if (!showModal) return null;

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                onClick={onClose}
            >
                <div
                    className="relative w-auto my-6 mx-auto max-w-3xl"
                    onClick={handleModalClick}
                >
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Update Status for {productName}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>

                        <div className="relative p-6 flex-auto">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Update Status:
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={handleStatusChange}
                                className="mt-2 p-2 border border-gray-300 rounded w-full font-montserrat"
                            >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default StatusUpdateModal;