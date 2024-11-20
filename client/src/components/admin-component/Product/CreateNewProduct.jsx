import React, { useState } from 'react';
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateNewProduct = () => {
    const [productName, setProductName] = useState('');
    const [productSKU, setProductSKU] = useState('');
    const [getPrice, setGetPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quantity, setQuantity] = useState('');

    const validateForm = () => {
        if (!productName || !productSKU || !getPrice || !sellPrice || !description || !imageUrl) {
            setError('All fields are required');
            return false;
        }
        if (isNaN(getPrice) || isNaN(sellPrice)) {
            setError('Prices must be valid numbers');
            return false;
        }
        if (isNaN(quantity)){
            setError('Quantity must be a number');
            return false;
        }
        if (parseFloat(getPrice) < 0 || parseFloat(sellPrice) < 0) {
            setError('Prices cannot be negative');
            return false;
        }
        return true;
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Debug log - File details
        console.log('Selected file:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        });

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            const errorMsg = 'Please upload only image files (JPEG, PNG, GIF)';
            console.error('File type error:', errorMsg);
            setError(errorMsg);
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            const errorMsg = 'File size must be less than 5MB';
            console.error('File size error:', errorMsg);
            setError(errorMsg);
            return;
        }

        setError('');
        setIsUploading(true);

        try {
            const fileName = `products/${Date.now()}-${file.name}`;

            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    setError('Failed to upload image. Please try again.');
                    setIsUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                        setImageUrl(downloadURL);
                        setIsUploading(false);
                    } catch (error) {
                        setError('Failed to get image URL. Please try again.');
                        setIsUploading(false);
                    }
                }
            );
        } catch (error) {
            setError('Failed to start upload. Please try again.');
            setIsUploading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!validateForm()) return;
        if (isUploading) {
            setError('Please wait for the image to finish uploading');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const productData = {
            productName: productName.trim(),
            productSKU: productSKU.trim(),
            quantity:parseInt(quantity),
            getPrice: parseFloat(getPrice),
            sellPrice: parseFloat(sellPrice),
            description: description.trim(),
            imageUrl
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData);

            // Reset form
            setProductName('');
            setProductSKU('');
            setGetPrice('');
            setQuantity('');
            setSellPrice('');
            setDescription('');
            setImageUrl('');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-black text-xl font-bold">Create New Product</h6>
                    <button
                        className={`bg-indigo-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                            (isSubmitting || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || isUploading}
                    >
                        {isSubmitting ? 'Adding...' : 'Add New Product'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-200 mt-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product Name<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product SKU Code<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={productSKU}
                                    onChange={(e) => setProductSKU(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product Quantity<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product Get Price*<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={getPrice}
                                    onChange={(e) => setGetPrice(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product Sell Price<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={sellPrice}
                                    onChange={(e) => setSellPrice(e.target.value)}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Upload Product Image<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    onChange={handleImageUpload}
                                    disabled={isSubmitting || isUploading}
                                />
                                {isUploading && (
                                    <div className="relative pt-1 mt-4">
                                        <div className="flex mb-2 items-center justify-between">
                                            <span className="text-xs font-semibold text-blue-600">Uploading...</span>
                                            <span
                                                className="text-xs font-semibold text-blue-600">{Math.round(uploadProgress)}%</span>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                            <div
                                                style={{width: `${uploadProgress}%`}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                {imageUrl && (
                                    <div className="mt-2">
                                        <img src={imageUrl} alt="Product preview"
                                             className="h-32 w-32 object-cover rounded"/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Product Description<span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewProduct;