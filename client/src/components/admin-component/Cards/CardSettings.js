import React, { useState, useEffect } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import AuthService from '../../../services/authService';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
  const [messageType, setMessageType] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
      if (currentUser.image_url) {
        setImagePreview(currentUser.image_url);
      }
    }
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please upload an image file');
      setMessageType('error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size should be less than 5MB');
      setMessageType('error');
      return;
    }

    try {
      setIsUploading(true);
      const storage = getStorage();

      // Delete old image if exists
      if (formData.image_url) {
        try {
          const oldImageRef = ref(storage, formData.image_url);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.log('No old image to delete or error deleting:', error);
        }
      }

      // Create new file reference
      const userId = AuthService.getCurrentUser()?.id;
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `profile_images/${userId}_${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, fileName);

      // Upload new image
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);

      // Update preview and form data
      setImagePreview(downloadURL);
      setFormData(prev => ({
        ...prev,
        image_url: downloadURL
      }));

      setMessage('Image uploaded successfully');
      setMessageType('success');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
      setMessageType('error');
    } finally {
      setIsUploading(false);
    }
  };

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
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user'));

      if (!currentUser || !currentUser.id) {
        setMessage('User ID not found');
        setMessageType('error');
        return;
      }

      // Create data object with userId
      const dataToSend = {
        ...formData,
        userId: currentUser.id  // Make sure this is included
      };

      console.log('Sending data:', dataToSend); // Debug log

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (response.ok) {
        // Update local storage with new user data
        const updatedUser = {
          ...currentUser,
          ...data.user
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setMessage('Profile updated successfully!');
        setMessageType('success');

        // Reset password fields
        setFormData(prev => ({
          ...prev,
          password: '',
          new_password: ''
        }));
      } else {
        setMessage(data.message || 'Failed to update profile.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Update error:', error);
      setMessage('An error occurred while updating profile.');
      setMessageType('error');
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
              <div className={`mb-4 p-4 rounded ${
                  messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
          )}

          <form id="settings-form" onSubmit={handleSubmit}>
            <h6 className="text-blue-950 text-sm mt-3 mb-6 font-bold uppercase">
              Profile Image
            </h6>

            <div className="flex flex-wrap mb-6">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <div className="flex items-center space-x-4">
                    {imagePreview && (
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                              src={imagePreview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                          />
                        </div>
                    )}
                    <label className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all">
                        {isUploading ? (
                            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                        ) : (
                            <Upload className="h-5 w-5 text-gray-500" />
                        )}
                        <span className="text-sm font-medium text-gray-700">
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </span>
                      </div>
                      <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          disabled={isUploading}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Square image, max 5MB
                  </p>
                </div>
              </div>
            </div>

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
