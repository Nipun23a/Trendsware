import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import axios from "axios";

const EditProduct = ({ product }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const location = useLocation();
    const { productId } = useParams();
    const [productData, setProductData] = useState({
        productName: "",
        productSKU: "",
        getPrice: "",
        sellPrice: "",
        description: "",
        quantity: "",
        imageUrl: "" // add imageUrl to state
    });

    useEffect(() => {
        if (location.state && location.state.product) {
            setProductData(location.state.product);
            setImageUrl(location.state.product.imageUrl || ''); // Set initial image URL if available
        } else {
            // If the state data isn't available, fetch data by productId (optional)
            // fetchProductById(productId).then((data) => setProductData(data));
        }
    }, [location.state, productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            setUploadProgress(0);
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                }
            }, 200);

            try {
                const fileName = `products/${Date.now()}-${file.name}`;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (error) => {
                        console.error('Upload error details:', error);
                        setIsUploading(false);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageUrl(downloadURL);
                        setIsUploading(false);
                    }
                );
            } catch (error) {
                console.error("Upload error details:", error);
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedProductData = {
            ...productData,
            imageUrl: imageUrl || productData.imageUrl // Use the uploaded image URL if available, else keep the old one
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${productId}`, updatedProductData);
            console.log("Product updated successfully:", response.data);
        } catch (error) {
            console.log('API error details', error);
        }
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-black text-xl font-bold">Edit Product</h6>
                    <button
                        className={`bg-indigo-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-200 mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                value={productData.productName}
                                onChange={handleInputChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Product SKU Code</label>
                            <input
                                type="text"
                                name="productSKU"
                                value={productData.productSKU}
                                onChange={handleInputChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mt-6">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Product Get Price</label>
                            <input
                                type="number"
                                name="getPrice"
                                value={productData.getPrice}
                                onChange={handleInputChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mt-6">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Product Sell Price</label>
                            <input
                                type="number"
                                name="sellPrice"
                                value={productData.sellPrice}
                                onChange={handleInputChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mt-6">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={productData.quantity}
                                onChange={handleInputChange}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                        <div className="w-full lg:w-12/12 px-4 mt-6">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Upload Product Image</label>
                            <input
                                type="file"
                                id="image-upload"
                                onChange={handleImageUpload}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                            {isUploading && (
                                <div className="relative pt-1 mt-4">
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                        <div
                                            style={{ width: `${uploadProgress}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                        ></div>
                                    </div>
                                </div>
                            )}
                            {imageUrl && !isUploading && (
                                <div className="mt-4">
                                    <img src={imageUrl} alt="Product" className="max-w-full h-auto" />
                                </div>
                            )}
                        </div>
                        <div className="w-full lg:w-12/12 px-4 mt-6">
                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Product Description</label>
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
