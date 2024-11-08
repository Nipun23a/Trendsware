import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from "../Modal/Modal";

const CardAllProduct = () => {
    const navigate = useNavigate();

    const [showModal,setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const products = [
        { id: 1, name: 'Product A',sku: 'SKU0123456789', quantity: 4569, getPrice: 46.53, sellPrice: 50.87,description:"This is Product A Description" },
        { id: 2, name: 'Product B',sku: 'SKU0123456789', quantity: 3985, getPrice: 46.53, sellPrice: 46.53,description:"This is Product B Description" },
        { id: 3, name: 'Product C',sku: 'SKU0123456789', quantity: 3513, getPrice: 36.49, sellPrice: 50.87,description:"This is Product C Description" },
        { id: 4, name: 'Product D',sku: 'SKU0123456789', quantity: 2050, getPrice: 46.53, sellPrice: 46.53,description:"This is Product D Description" },
        { id: 5, name: 'Product E',sku: 'SKU0123456789', quantity: 1795, getPrice: 46.53, sellPrice: 46.53,description:"This is Product E Description" },
    ];

    const handleEditClick = (product) => {
        navigate(`/admin/products/edit/${product.id}}`,{state: {product}});
    };

    const handleDeactivateClick = (product) => {
      setSelectedProduct(product);
      setShowModal(true);
    };

    const handleConfirmDeactivate = () => {
        console.log(`Product ${selectedProduct.name} deactivated`);
        setShowModal(false);
        setSelectedProduct(null);
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
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                ID
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

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                    {product.id}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.name}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {product.sku}
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
                                        key={product.id}
                                        className="bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleEditClick(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleDeactivateClick(product)}
                                    >
                                        Deactivate
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
                    title="Deactivate Product"
                    message={`Are you sure you want to deactivate ${selectedProduct.name}?`}
                    onConfirm={handleConfirmDeactivate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default CardAllProduct;
