import React, { useState, useEffect } from 'react';
import AuthService from '../../../services/authService';

export default function CardSettings() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image_url: '',
    password: '',
    new_password: '',
    is_active: true
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
        image_url: currentUser.image_url || '',
        is_active: currentUser.is_active
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthService.getToken()}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage('An error occurred while updating profile.');
      console.error('Update error:', error);
    }
  };

  return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blue-950 text-xl font-bold">My Account</h6>
            <button
                className="bg-indigo-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
                form="settings-form"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {message && (
              <div className="mb-4 p-4 rounded bg-blue-100 text-blue-700">
                {message}
              </div>
          )}

          <form id="settings-form" onSubmit={handleSubmit}>
            <h6 className="text-blue-950 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blue-950 text-xs font-bold mb-2"
                      htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                      id="name"
                      name="name"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blue-950 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blue-950 text-xs font-bold mb-2"
                      htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                      id="email"
                      name="email"
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blue-950 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blue-950 text-xs font-bold mb-2"
                      htmlFor="image_url"
                  >
                    Profile Image URL
                  </label>
                  <input
                      id="image_url"
                      name="image_url"
                      type="url"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blue-950 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.image_url}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blue-950 text-sm mt-3 mb-6 font-bold uppercase">
              Password Update
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blue-950 text-xs font-bold mb-2"
                      htmlFor="current_password"
                  >
                    Current Password
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blue-950 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blue-950 text-xs font-bold mb-2"
                      htmlFor="new_password"
                  >
                    New Password
                  </label>
                  <input
                      id="new_password"
                      name="new_password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blue-950 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={formData.new_password}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                        id="is_active"
                        name="is_active"
                        type="checkbox"
                        className="form-checkbox rounded text-indigo-500 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        checked={formData.is_active}
                        onChange={handleChange}
                    />
                    <span className="ml-2 text-sm font-semibold text-blue-950">
                    Account Active
                  </span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}