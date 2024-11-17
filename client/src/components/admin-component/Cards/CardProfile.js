import React, { useState, useEffect } from 'react';
import defaultProfile from '../../../assets/img/team-2-800x800.jpg';
import AuthService from "../../../services/authService";

export default function CardProfile() {
  const [user, setUser] = useState({
    _id: "",
    name: '',
    email: '',
    image_url: '',
    role: '',
    createdAt: null,
    is_active: true,
    updatedAt: null
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          // Update the state with the MongoDB data structure
          setUser({
            _id: currentUser._id || "",
            name: currentUser.name || "",
            email: currentUser.email || "",
            image_url: currentUser.image_url || "",
            role: currentUser.role || "",
            is_active: currentUser.is_active ?? true,
            createdAt: currentUser.createdAt || null,
            updatedAt: currentUser.updatedAt || null
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error appropriately
      }
    };

    fetchUserProfile();
  }, []);

  // Function to get role display text
  const getRoleDisplay = (role) => {
    const roles = {
      admin: 'Administrator',
      customer: 'Customer',
      worker: 'Worker'
    };
    return roles[role] || 'User';
  };

  // Function to get status badge color
  const getStatusColor = () => {
    return user.is_active ? 'text-green-500' : 'text-red-500';
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative w-40 h-40 -mt-16">
                <img
                    alt="Profile"
                    src={user.image_url || defaultProfile}
                    className="rounded-full w-full h-full object-cover border-none shadow-xl"
                    style={{
                      minWidth: '160px',
                      minHeight: '160px'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfile;
                    }}
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-5">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                <span className={`text-xl font-bold block uppercase tracking-wide ${getStatusColor()}`}>
                  Status
                </span>
                  <span className="text-sm text-blueGray-400">
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
                </div>
                <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  Role
                </span>
                  <span className="text-sm text-blueGray-400">
                  {getRoleDisplay(user.role)}
                </span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  ID
                </span>
                  <span className="text-sm text-blueGray-400">
                  {user._id?.slice(-4) || 'N/A'}
                </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              {user.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
              {user.email}
            </div>

            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-user-shield mr-2 text-lg text-blueGray-400"></i>
              {getRoleDisplay(user.role)} Account
            </div>

            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-clock mr-2 text-lg text-blueGray-400"></i>
              Member since {formatDate(user.createdAt)}
            </div>
          </div>

          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                {user.is_active ? (
                    <div className="mb-4 text-lg leading-relaxed text-green-600">
                      Account Active and In Good Standing
                    </div>
                ) : (
                    <div className="mb-4 text-lg leading-relaxed text-red-600">
                      Account Currently Inactive
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}