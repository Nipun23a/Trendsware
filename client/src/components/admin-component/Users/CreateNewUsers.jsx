import React, { useState } from 'react';
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useNavigate} from "react-router-dom";


const CreateNewUsers = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        imageUrl: ''
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
            setError('All fields are required');
            return false;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            const fileName = `users/${Date.now()}-${file.name}`;
            console.log('Attempting to upload file to path:', fileName);

            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload progress:', `${progress.toFixed(2)}%`);
                },
                (error) => {
                    console.error("Upload error details:", {
                        code: error.code,
                        message: error.message,
                        serverResponse: error.serverResponse
                    });
                    setError('Failed to upload image. Please try again.');
                    setIsUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('Upload successful! Download URL:', downloadURL);
                        console.log('Total bytes transferred:', uploadTask.snapshot.bytesTransferred);
                        console.log('Final upload state:', uploadTask.snapshot.state);

                        setFormData(prev => ({
                            ...prev,
                            imageUrl: downloadURL
                        }));
                        setIsUploading(false);
                    } catch (error) {
                        console.error("Error getting download URL:", {
                            code: error.code,
                            message: error.message,
                            serverResponse: error.serverResponse
                        });
                        setError('Failed to get image URL. Please try again.');
                        setIsUploading(false);
                    }
                }
            );
        } catch (error) {
            console.error("Error initiating upload:", {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            setError('Failed to start upload. Please try again.');
            setIsUploading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Debug log - Form submission
        console.log('Submitting form with data:', {
            ...formData,
            password: '***hidden***',
            confirmPassword: '***hidden***'
        });

        if (!validateForm()) return;
        if (isUploading) {
            setError('Please wait for the image to finish uploading');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const userData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role,
            imageUrl: formData.imageUrl
        };

        try {
            console.log('Sending request to API with data:', {
                ...userData,
                password: '***hidden***'
            });
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, userData);
            console.log("User created successfully:", response.data);

            // Reset form
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                imageUrl: ''
            });
            setError('');
            navigate('/admin/users/')

        } catch (error) {
            console.error("API error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            setError(error.response?.data?.message || 'Error creating user. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-black text-xl font-bold">Create New User</h6>
                    <button
                        className={`bg-indigo-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                            (isSubmitting || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || isUploading}
                    >
                        {isSubmitting ? 'Creating...' : 'Create User'}
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
                                    Name<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Email<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Password<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Confirm Password<span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    User Role<span className="text-red-600">*</span>
                                </label>
                                <select
                                    name="role"
                                    className="border-0 px-3 py-3 bg-white rounded text-sm shadow w-full"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select a role</option>
                                    <option value="worker">Worker</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                                    Upload User Image<span className="text-red-600">*</span>
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
                                            <span className="text-xs font-semibold text-blue-600">{Math.round(uploadProgress)}%</span>
                                        </div>
                                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                            <div
                                                style={{width: `${uploadProgress}%`}}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                {formData.imageUrl && (
                                    <div className="mt-2">
                                        <img src={formData.imageUrl} alt="User preview" className="h-32 w-32 object-cover rounded"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewUsers;