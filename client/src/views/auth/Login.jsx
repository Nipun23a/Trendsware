import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await AuthService.login(email, password);
            const from = location.state?.from?.pathname ||
                (response.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-blue-950 text-lg font-bold font-montserrat">
                                    Sign in with Credentials
                                </h6>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm font-bold text-center">
                                    {error}
                                </div>
                            )}
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleLogin}>
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blue-950 text-xs font-bold mb-2 font-montserrat">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="border-0 px-3 py-3 placeholder-text-blue-300 text-gray-500 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 font-montserrat"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blue-950 text-xs font-bold mb-2 font-montserrat">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="font-montserrat border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mt-5">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-blue-900 ml-1 w-5 h-5 ease-linear transition-all duration-150 outline-1 outline-blue-900"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-blueGray-600 font-montserrat">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        className="font-montserrat bg-blue-950 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;