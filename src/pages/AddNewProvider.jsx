import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { addProvider } from "../features/providerSlice";
import uploadImg from "../Assets/download.svg";
import FileUpload from "../components/FileUpload";
import { Link, Navigate } from "react-router-dom";

const AddNewProvider = () => {
  const dispatch = useDispatch();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    profession: "",
    areaOfOperation: "",
    experience: "",
    workingHoursFrom: "",
    workingHoursTill: "",
    identityType: "",
    identityNumber: "",
    degreeName: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform basic validation (password match, required fields)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Collect all data, including the image and phone number
    const newProviderData = {
      ...formData,
      contactNumber: phoneNumber,
      profileImage: selectedImage,
    };

    // Dispatch to Redux Thunk to add the provider
    dispatch(addProvider(newProviderData))
      .unwrap()
      .then(() => {
        alert("Provider added successfully");
        // Clear form after submission
        setFormData({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          profession: "",
          areaOfOperation: "",
          experience: "",
          workingHoursFrom: "",
          workingHoursTill: "",
          identityType: "",
          identityNumber: "",
          degreeName: "",
          password: "",
          confirmPassword: "",
        });
        setSelectedImage(null);
        setPhoneNumber("");
      })
      .catch((error) => {
        alert("Error adding provider. Please try again.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins">
      <h1 className="mb-2 font-medium">Add New Provider</h1>
      <div className="bg-white shadow-sm flex flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="border-b-[1.4px] border-black font-inter pb-1 font-semibold">
              Personal Information
            </h1>
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
                    <img
                      src={uploadImg}
                      alt="upload-icon"
                      className="inline-block ml-2"
                    />
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
                    type="button"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>

              <div className="info w-full md:w-2/3 mt-6 md:mt-0 text-sm">
                <div className="space-y-4 p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="firstName" className="mb-1 ">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="border p-2 rounded-md w-full"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="lastName" className="mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className="border p-2 rounded-md w-full"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="contactNumber" className="mb-1">
                        Contact Number
                      </label>
                      <PhoneInput
                        country={"pk"}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        inputClass="w-full border p-2 rounded-md"
                        inputStyle={{ width: "100%" }}
                        containerClass="border rounded-md w-full"
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="email" className="mb-1">
                        Email
                      </label>
                      <div className="flex items-center border p-2 rounded-md w-full">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                          className="flex-1 bg-transparent outline-none"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mt-6">
            <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
              Professional Information
            </h1>
            <div className="w-full">
              <div className="space-y-4 p-4 w-full text-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="profession" className="mb-1">
                      Profession
                    </label>
                    <select
                      name="profession"
                      id="profession"
                      className="border p-2 rounded-md w-full"
                      value={formData.profession}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="engineer">Engineer</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="areaOfOperation" className="mb-1">
                      Area of Operation
                    </label>
                    <select
                      name="areaOfOperation"
                      id="areaOfOperation"
                      className="border p-2 rounded-md w-full"
                      value={formData.areaOfOperation}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="karachi">Karachi</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="workingHoursFrom" className="mb-1">
                      Working Hours From
                    </label>
                    <input
                      type="time"
                      name="workingHoursFrom"
                      id="workingHoursFrom"
                      className="border p-2 rounded-md w-full"
                      value={formData.workingHoursFrom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="workingHoursTill" className="mb-1">
                      Working Hours Till
                    </label>
                    <input
                      type="time"
                      name="workingHoursTill"
                      id="workingHoursTill"
                      className="border p-2 rounded-md w-full"
                      value={formData.workingHoursTill}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="mt-6">
            <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
              Security Information
            </h1>
            <div className="space-y-4 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="identityType" className="mb-1">
                    Identity Type
                  </label>
                  <select
                    name="identityType"
                    id="identityType"
                    className="border p-2 rounded-md w-full"
                    value={formData.identityType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="cnic">CNIC</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="identityNumber" className="mb-1">
                    Identity Number
                  </label>
                  <input
                    type="text"
                    name="identityNumber"
                    id="identityNumber"
                    placeholder="Enter Identity Number"
                    className="border p-2 rounded-md w-full"
                    value={formData.identityNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="degreeName" className="mb-1">
                    Degree Name
                  </label>
                  <input
                    type="text"
                    name="degreeName"
                    id="degreeName"
                    placeholder="Enter Degree Name"
                    className="border p-2 rounded-md w-full"
                    value={formData.degreeName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="mt-6">
            <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
              Password Information
            </h1>
            <div className="space-y-4 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="password" className="mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="border p-2 rounded-md w-full"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="confirmPassword" className="mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="border p-2 rounded-md w-full"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end gap-10">
          <Link to={'/list-of-provider'}>
            <button
              className="bg-gray-400 text-gray-50 px-6 py-2 rounded-md"
            >
              Cancel
            </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProvider;
