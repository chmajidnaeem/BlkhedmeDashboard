import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import uploadImg from "../Assets/download.svg";
import FileUpload from "../components/FileUpload";


const AddNewProvider = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins">
      <h1 className="mb-2 font-medium">Add New Provider</h1>
      <div className="bg-white shadow-sm flex flex-col gap-4 p-4">
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
                >
                  Remove Photo
                </button>
              </div>
            </div>

            <div className="info w-full md:w-2/3 mt-6 md:mt-0 text-sm">
              <form action="#" className="space-y-4 p-4">
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
                      inputClass="w-full border p-2 rounded-md"
                      inputStyle={{ width: "100%" }}
                      containerClass="border rounded-md w-full"
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
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
            Professional Information
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="password" className="mb-1">
                    Profession
                  </label>
                  <select
                    name="profession"
                    id="profession"
                    className="border p-2 rounded-md w-full"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="engineer">Engineer</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="operation" className="mb-1">
                    Area of Operation
                  </label>

                  <select
                    name="areaOfOperation"
                    id="operation"
                    className="border p-2 rounded-md w-full"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="electricity">Electricity</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="password" className="mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="exprerience"
                    id="experience"
                    placeholder="Years of Experience"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="confirmPassword" className="mb-1">
                    Working Hours
                  </label>
                  <div className="flex gap-4 flex-col md:flex-row">
                  <input
                    type="number"
                    name="wHours"
                    id="wHours"
                    placeholder="From"
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="number"
                    name="wHours"
                    id="wHours"
                    placeholder="Till"
                    className="border p-2 rounded-md"
                  />
                  </div>
                </div>
              </div>
              
            </form>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
            Documents
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex gap-4 w-full flex-col md:flex-row">
                  <div className="flex flex-col">
                  <label htmlFor="password" className="mb-1">
                    Identity Type
                  </label>
                  <select
                    name="idType"
                    id="identityType"
                    className="border p-2 rounded-md"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="NationalId">National ID</option>
                    <option value="NationalPassport">National Passport</option>
                    <option value="DrivingLicense">Driver License</option>
                    <option value="TradeId">Trade ID</option>
                  </select>
                  </div>
                  <div className="flex flex-col">
                  <label htmlFor="password" className="mb-1">
                    Identity Number
                  </label>
                  <input type="number" placeholder="Identity Number"className="border p-2 rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="operation" className="mb-1">
                    Name of the Degree
                  </label>

                  <select
                    name="degreeName"
                    id="degreeName"
                    className="border p-2 rounded-md w-full"
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="BBA">BBA</option>
                  </select>
                </div>
              </div>
              

<div className="">
<FileUpload />
</div>

              
            </form>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-semibold">
            Password
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm">
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
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6 text-sm">
          <button className="bg-[#D9D9D9] text-white px-4 py-2 rounded-md">
            Cancel
          </button>
          <button className="bg-[#0085FF] text-white px-4 py-2 rounded-md">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProvider;
