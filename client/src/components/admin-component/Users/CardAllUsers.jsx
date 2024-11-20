import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "../Modal/Modal";

const CardAllUsers = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data && Array.isArray(data)) {
                setUsers(data);
            } else {
                throw new Error('Invalid data format received');
            }
            setError(null);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Error loading users: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (user) => {
        navigate(`/admin/users/edit/${user._id}`, { state: { user } });
    };

    const handleStatusClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleConfirmStatusChange = async () => {
        try {

            const endpoint = selectedUser.is_active ? `deactivate` : `activate`;
            const response = await fetch(`http://localhost:5000/api/users/${selectedUser._id}/${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to ${selectedUser.is_active ? 'deactivate' : 'activate'} user`);
            }

            await fetchUsers();
            setShowModal(false);
            setSelectedUser(null);
        } catch (err) {
            setError('Error updating user status: ' + err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded p-4">
                <div className="text-center">Loading users...</div>
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
                            <h3 className="font-semibold text-base text-black">All Users</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <a
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                href="/admin/users/create"
                            >
                                Add New User
                            </a>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Image</th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Email</th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Role</th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex items-center">
                                            <div
                                                className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                                {user.image_url ? (
                                                    <img
                                                        src={user.image_url}
                                                        alt={user.name}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder-image.png';
                                                            e.target.onerror = null;
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                        No img
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.name}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.email}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{user.role}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                        <button
                                            className="bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${
                                                user.is_active ? 'bg-red-500' : 'bg-green-500'
                                            } text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                            onClick={() => handleStatusClick(user)}
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && (
                <Modal
                    title={`${selectedUser.is_active? 'Deactivate' : 'Activate'} User`}
                    message={`Are you sure you want to ${selectedUser.is_active ? 'deactivate' : 'activate'} ${selectedUser.name}?`}
                    onConfirm={handleConfirmStatusChange}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default CardAllUsers;



