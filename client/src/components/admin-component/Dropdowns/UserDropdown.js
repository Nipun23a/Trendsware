import React, { useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/authService"; // Adjust path as needed
import defaultAvatar from "../../../assets/img/team-1-800x800.jpg"; // Your default avatar

const UserDropdown = () => {
    const navigate = useNavigate();
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = useRef();
    const popoverDropdownRef = useRef();

    // Get current user data
    const user = AuthService.getCurrentUser();
    const userImage = user?.image_url|| defaultAvatar;
    const userName = user?.name || "User";

    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-end",
        });
        setDropdownPopoverShow(true);
    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleSignOut = (e) => {
        e.preventDefault();
        AuthService.logout();
        closeDropdownPopover();
        navigate('/auth/login');
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        closeDropdownPopover();
        navigate('/admin/profile');
    };

    return (
        <>
            <div className="relative">
                <button
                    className="text-gray-500 block"
                    ref={btnDropdownRef}
                    onClick={(e) => {
                        e.preventDefault();
                        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                    }}
                >
                    <div className="items-center flex">
            <span className="w-12 h-12 text-sm text-white bg-blue-200 inline-flex items-center justify-center rounded-full">
              <img
                  alt={userName}
                  className="w-full h-full rounded-full align-middle border-none shadow-lg object-cover"
                  src={userImage}
                  onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                  }}
              />
            </span>
                    </div>
                </button>
                <div
                    ref={popoverDropdownRef}
                    className={
                        (dropdownPopoverShow ? "block " : "hidden ") +
                        "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 absolute right-0 mt-2"
                    }
                >
                    <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-700">{userName}</p>
                        {user?.email && (
                            <p className="text-xs text-gray-500">{user.email}</p>
                        )}
                    </div>

                    <Link
                        to="/admin/profile"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                        onClick={handleSettingsClick}
                    >
                        <i className="fas fa-cog mr-2 text-gray-400"></i>
                        Settings
                    </Link>

                    {user?.role === 'admin' && (
                        <Link
                            to="/admin/dashboard"
                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                            onClick={() => closeDropdownPopover()}
                        >
                            <i className="fas fa-chart-line mr-2 text-gray-400"></i>
                            Dashboard
                        </Link>
                    )}

                    <div className="h-0 my-2 border border-solid border-gray-200" />

                    <button
                        onClick={handleSignOut}
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-600 hover:bg-red-50 text-left transition duration-150 ease-in-out"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDropdown;