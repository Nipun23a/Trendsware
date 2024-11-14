import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "../Modal/Modal";

const CardAllProduct = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/products/'); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Check if data exists and is an array
            if (data && Array.isArray(data)) {
                setProducts(data);
            } else {
                throw new Error('Invalid data format received');
            }
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error loading products: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (product) => {
        navigate(`/admin/products/edit/${product._id}`, { state: { product } });
    };

    const handleStatusClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleConfirmStatusChange = async () => {
        try {
            const endpoint = selectedProduct.is_active
                ? `deactivate`
                : `activate`;
            const response = await fetch(`http://localhost:5000/api/products/${selectedProduct._id}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to ${selectedProduct.is_active ? 'deactivate' : 'activate'} product`);
            }

            await fetchProducts();
            setShowModal(false);
            setSelectedProduct(null);
        } catch (err) {
            setError('Error updating product status: ' + err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-4">
                <div className="text-center">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-4">
                <div className="text-center text-red-500">{error}</div>
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
                                All Products
                            </h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <a
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                href="/admin/products/create"
                            >
                                Add New Product
                            </a>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Image
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Name
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                SKU
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Quantity
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Get Price
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Sell Price
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.productName}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-image.png';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                    No img
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.productName}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.productSKU}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.quantity}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.getPrice}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.sellPrice}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button
                                        className="bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleEditClick(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`${
                                            product.is_active ? 'bg-red-500' : 'bg-green-500'
                                        } text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        onClick={() => handleStatusClick(product)}
                                    >
                                        {product.is_active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <Modal
                    title={selectedProduct.is_active ? "Deactivate Product" : "Activate Product"}
                    message={`Are you sure you want to ${selectedProduct.is_active ? "deactivate" : "activate"} ${selectedProduct.productName}?`}
                    onConfirm={handleConfirmStatusChange}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default CardAllProduct;
