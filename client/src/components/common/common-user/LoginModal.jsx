import React, { useEffect } from "react";
import { X, Mail, Lock, Facebook, Twitter } from "lucide-react";
import LoginModalImage from "../../../assets/images/login-modal-image.jpg";

const LoginModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg w-full max-w-4xl p-6 shadow-xl transform transition-all duration-300 ease-in-out animate-modal-up flex flex-col md:flex-row overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                    <X size={24} />
                </button>

                {/* Image Container: Hidden on small screens */}
                <div className="hidden md:block w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
                    <img
                        src={LoginModalImage}
                        alt="Login"
                        className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4 text-white text-[40px] font-bold font-raleway">
                        Trendsware
                    </div>
                </div>

                {/* Form Container */}
                <div className="w-full md:w-1/2 p-8 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 justify-center md:justify-start">
                            <h2 className="text-[36px] md:text-[48px] font-bold font-montserrat">
                                Welcome Back
                            </h2>
                            <span className="animate-wave text-[36px] md:text-[48px]">👋</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4">
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-black font-montserrat font-light">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Facebook size={24} className="text-blue-600" />
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Twitter size={24} className="text-blue-400" />
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-black font-montserrat font-light">
                        New To Trendsware?{" "}
                        <a href="#" className="text-black font-medium underline">
                            Create An Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

