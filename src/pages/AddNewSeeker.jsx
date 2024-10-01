import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import uploadImg from '../Assets/download.svg';
import { useDispatch } from 'react-redux';
import { addSeeker } from '../features/seekerSlice';
import { useNavigate } from 'react-router-dom';

const AddNewSeeker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Clear success message and errors before submitting
    setSuccessMessage('');
    setErrors({});

    try {
      const response = await dispatch(addSeeker({
        ...formData,
        profile_image: selectedImage, 
        name: `${formData.first_name} ${formData.last_name}`,
        ratings: "0", // Default ratings
        calls: "0",   // Default call count
        reviews: "0", // Default review count
        date: Math.floor(Date.now() / 1000), // Current timestamp
      })).unwrap();

      // If seeker added successfully, show success message and reset form
      setSuccessMessage('Seeker added successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
      });
      setSelectedImage(null); // Clear the selected image
    } catch (error) {
      // Log the full error to debug
      console.log('Full error:', error);

      if (error.message) {
        const apiErrors = JSON.parse(error.message); // Parse the error string to object
        console.log('API Errors:', apiErrors); // Log the full API error response for debugging

        const errorMessages = {};

        if (apiErrors.email) {
          errorMessages.email = apiErrors.email[0];
        }
        if (apiErrors.phone) {
          errorMessages.phone = apiErrors.phone[0];
        }

        setErrors(errorMessages);
      } else {
        setErrors({ general: 'An unknown error occurred.' });
      }
    }
  };

  const handleCancel = () => {
    navigate('/list-of-seeker'); // Redirect to the list of seekers page
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins">
      <h1 className="mb-2 font-medium">Add New Seeker</h1>
      <div className="bg-white shadow-sm flex flex-col gap-4 p-4">
        <div>
          <h1 className="border-b-[1.4px] border-black pb-1 font-semibold font-inter">Personal Information</h1>
          <div className="flex flex-col md:flex-row items-center justify-between p-2">
            <div className="picture flex flex-col items-center">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-md mb-2 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div className="buttons flex flex-col items-center gap-2 text-sm">
                <label
                  htmlFor="upload"
                  className="cursor-pointer bg-[#0085FF] text-white px-4 py-2 rounded-md"
                >
                  Upload Photo
                  <img src={uploadImg} alt="upload-icon" className="inline-block ml-2" />
                </label>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  className="bg-[#B80000] text-white px-4 py-2 rounded-md"
                  onClick={handleImageRemove}
                >
                  Remove Photo
                </button>
              </div>
            </div>

            <div className="info w-full md:w-2/3 mt-6 md:mt-0 text-sm">
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="firstName" className="mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="firstName"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className={`border p-2 rounded-md w-full ${errors.first_name ? 'border-red-500' : ''}`}
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="lastName" className="mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="lastName"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className={`border p-2 rounded-md w-full ${errors.last_name ? 'border-red-500' : ''}`}
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="contactNumber" className="mb-1">
                      Contact Number
                    </label>
                    <PhoneInput
                      country={"pk"}
                      value={formData.phone}
                      onChange={(value) => setFormData({ ...formData, phone: value })}
                      inputClass={`w-full border p-2 rounded-md ${errors.phone ? 'border-red-500' : ''}`}
                      inputStyle={{ width: "100%" }}
                      containerClass="border rounded-md w-full"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-1">
                      Email
                    </label>
                    <div className={`flex items-center border p-2 rounded-md w-full ${errors.email ? 'border-red-500' : ''}`}>
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        className="flex-1 bg-transparent outline-none"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="password" className="mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter Password"
                      className="border p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="confirm_password" className="mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="border p-2 rounded-md w-full"
                    />
                  </div>
                </div>

                {/* Success message */}
                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Seeker
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

export default AddNewSeeker;
