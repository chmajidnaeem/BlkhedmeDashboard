import React, { useState, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { addProvider } from "../features/providerSlice";
import uploadImg from "../Assets/download.svg";
import { Link } from "react-router-dom";

const AddNewProvider = () => {
  const dispatch = useDispatch();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    profession: "",
    areaOfOperation: "", // This will be used for the selected location
    experience: "",
    workingHoursFrom: "",
    workingHoursTill: "",
    identityType: "",
    identityNumber: "",
    degreeName: "",
    password: "",
    confirmPassword: "",
  });

  const [locations, setLocations] = useState([]); // State for locations
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch locations from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("https://apiv2.blkhedme.com/api/locations/show");
        const data = await response.json();
        if (data.status === 200) {
          setLocations(data.location);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  }, [selectedImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the File object directly
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
    setFormData((prevData) => ({
      ...prevData,
      contactNumber: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Provider Data before submission:', formData);

    // Validate password matching
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newProviderData = new FormData();
    newProviderData.append('first_name', formData.firstName);
    newProviderData.append('last_name', formData.lastName);
    newProviderData.append('phone', phoneNumber);
    newProviderData.append('email', formData.email);
    newProviderData.append('profession', formData.profession);
    newProviderData.append('area_of_operation', formData.areaOfOperation); // Use selected location title
    newProviderData.append('years_of_experience', formData.experience);
    newProviderData.append('working_hours_from', formData.workingHoursFrom);
    newProviderData.append('working_hours_till', formData.workingHoursTill);
    newProviderData.append('identity_type', formData.identityType);
    newProviderData.append('identity_number', formData.identityNumber);
    newProviderData.append('name_of_degree', formData.degreeName);
    newProviderData.append('password', formData.password);
    newProviderData.append('confirm_password', formData.confirmPassword);

    // Set the location_id and country_id based on the selected location
    const selectedLocation = locations.find(loc => loc.title === formData.areaOfOperation);
    if (selectedLocation) {
      newProviderData.append('location_id', selectedLocation.id);
      newProviderData.append('country_id', selectedLocation.country_id || null);
    }
    
    if (selectedImage) {
      newProviderData.append('images[]', selectedImage); // Append the File object
    }

    // Dispatch action
    dispatch(addProvider(newProviderData))
      .unwrap()
      .then(() => {
        alert("Provider added successfully");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          profession: "",
          areaOfOperation: "", // Reset area of operation (location)
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
                {previewImage ? (
                  <img
                    src={previewImage}
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
                    className="cursor-pointer bg-[#0085FF] text-white px-4 py-2 rounded-md flex items-center"
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
                    accept="image/*"
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
                      <div className="flex items-center border p-2 rounded-md">
                        <FaEnvelope className="text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email"
                          className="outline-none pl-2 w-full"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
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
                      <option value="">Select Area of Operation</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.title}>
                          {location.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="profession" className="mb-1">
                        Profession
                      </label>
                      <input
                        type="text"
                        name="profession"
                        id="profession"
                        placeholder="Enter Profession"
                        className="border p-2 rounded-md w-full"
                        value={formData.profession}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="experience" className="mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="experience"
                        id="experience"
                        placeholder="Enter Years of Experience"
                        className="border p-2 rounded-md w-full"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                      />
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

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col w-full">
                      <label htmlFor="identityType" className="mb-1">
                        Identity Type
                      </label>
                      <input
                        type="text"
                        name="identityType"
                        id="identityType"
                        placeholder="Enter Identity Type"
                        className="border p-2 rounded-md w-full"
                        value={formData.identityType}
                        onChange={handleInputChange}
                        required
                      />
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
                        Name of Degree
                      </label>
                      <input
                        type="text"
                        name="degreeName"
                        id="degreeName"
                        placeholder="Enter Name of Degree"
                        className="border p-2 rounded-md w-full"
                        value={formData.degreeName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
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
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
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
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Link to="/providers">
              <button
                className="bg-[#D4D4D4] text-black px-4 py-2 rounded-md mr-2"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <button className="bg-[#0085FF] text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProvider;
