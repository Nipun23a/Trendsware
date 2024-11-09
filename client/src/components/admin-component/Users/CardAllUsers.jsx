import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "../Modal/Modal";

//Asset
import User1 from "../../../assets/img/team-2-800x800.jpg";
import User2 from "../../../assets/img/team-3-800x800.jpg";
import User3 from "../../../assets/img/team-3-800x800.jpg";
import User4 from "../../../assets/img/team-4-470x470.png";

const CardAllUsers = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin', isActive: true, image: User1 },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'User', isActive: true, image: User2 },
        { id: 3, name: 'Michael Brown', email: 'michaelbrown@example.com', role: 'Shop Helper', isActive: false, image: User3 },
        { id: 4, name: 'Sarah Wilson', email: 'sarahwilson@example.com', role: 'User', isActive: true, image: User4 },
    ]);

    const handleEditClick = (user) => {
        navigate(`/admin/users/edit/${user.id}`, { state: { user } });
    };

    const handleDeactivateClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleConfirmDeactivate = () => {
        setUsers(users.map(user =>
            user.id === selectedUser.id ? { ...user, isActive: !user.isActive } : user
        ));
        setShowModal(false);
        setSelectedUser(null);
    };

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
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Image
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Name
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Email
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Role
                            </th>
                            <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <img src={user.image} alt={user.name} className="rounded-full h-10 w-10" />
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {user.name}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {user.email}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {user.role}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <button
                                        className="bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={`${
                                            user.isActive ? 'bg-red-500' : 'bg-green-500'
                                        } text-white font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        onClick={() => handleDeactivateClick(user)}
                                    >
                                        {user.isActive ? 'Deactivate' : 'Activate'}
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
                    title={`${selectedUser.isActive ? 'Deactivate' : 'Activate'} User`}
                    message={`Are you sure you want to ${selectedUser.isActive ? 'deactivate' : 'activate'} ${selectedUser.name}?`}
                    onConfirm={handleConfirmDeactivate}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default CardAllUsers;

