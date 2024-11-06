import React, { useEffect, useState } from "react";
import { X, Mail, Lock, Facebook, Twitter, User, } from "lucide-react";
import LoginModalImage from "../../../assets/images/login-modal-image.jpg";

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
    const redirectURI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

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

    const handleSwitchForm = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
            setIsAnimating(false);
        }, 300);
    };

    const handleGoogleLogin = (response) => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email%20profile&access_type=online`;
        window.location.href = googleAuthUrl;
        console.log("Google Login Successfully",response);
    }

    const handleGoogleFailure = (error) => {
        console.log("Google Failure",error);
    }

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
                    <div className={`transform transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                        {isLogin ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center space-x-2 justify-center md:justify-start">
                                        <h2 className="text-[36px] md:text-[48px] font-bold font-montserrat">
                                            Welcome
                                        </h2>
                                        <span className="animate-bounce text-[36px] md:text-[48px]">✨</span>
                                    </div>
                                </div>

                                {/* Signup Form */}
                                <form className="space-y-4">
                                    <div className="space-y-4">
                                        {/* Name Input */}
                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="relative">
                                            <User
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

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
                                                placeholder="Password"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <input
                                                type="password"
                                                placeholder="Re-Type Password"
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Create Account Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Account
                                    </button>
                                </form>
                            </>
                        )}

                        {/* Social Login */}
                        <div className="space-y-4 mt-5">
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
                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={handleGoogleLogin}>
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                </button>
                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Twitter size={24} className="text-blue-400" />
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-black font-montserrat font-light mt-6">
                            {isLogin ? (
                                <>
                                    New To Trendsware?{" "}
                                    <button onClick={handleSwitchForm} className="text-black font-medium underline">
                                        Create An Account
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <button onClick={handleSwitchForm} className="text-black font-medium underline">
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
