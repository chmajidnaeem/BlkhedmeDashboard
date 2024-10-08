import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import uploadImg from "../Assets/download.svg";
import FileUpload from "../components/FileUpload";
import { addProvider } from "../features/providerSlice"; // Adjust the path as necessary
import { fetchCategories } from "../features/categorySlice";
import { FaPaperclip } from 'react-icons/fa';

const AddNewProvider = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.providers);
  const { categories, categoryError } = useSelector((state) => state.categories);
  const [err, setErrors] = useState({});

  // Fetching categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profession, setProfession] = useState("");
  const [areaOfOperation, setAreaOfOperation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [workingHoursFrom, setWorkingHoursFrom] = useState("");
  const [workingHoursTill, setWorkingHoursTill] = useState("");
  const [idType, setIdType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // File Inputs
  const [profileImage, setProfileImage] = useState(null);
  const [degree, setDegree] = useState(null);
  const [identityCard, setIdentityCard] = useState(null);
  const identityInputRef = useRef(null);
  const degreeInputRef = useRef(null);

  // Image Upload Handlers
  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };

  const handleIdentityCardUpload = (e) => {
    handleImageUpload(e, setIdentityCard);
  };

  const handleDegreeUpload = (e) => {
    handleImageUpload(e, setDegree);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create FormData object for multipart form submission
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", contactNumber);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profession", profession);
    formData.append("area_of_operation", areaOfOperation);
    formData.append("years_of_experience", yearsExperience);
    formData.append("working_hours_from", workingHoursFrom);
    formData.append("working_hours_till", workingHoursTill);
    formData.append("identity_type", idType);
    formData.append("identity_number", identityNumber);
    formData.append("name_of_degree", degreeName);
    formData.append("password", password);
    formData.append("confirm_password", confirmPassword);
    formData.append('username',username);

    // Append images (profile image, degree, identity card)
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    if (degree) {
      formData.append("degree", degree);
    }
    if (identityCard) {
      formData.append("identity_card", identityCard);
    }

    // Dispatch the addProvider action with FormData
    dispatch(addProvider(formData))
      .unwrap()
      .then(() => {
        alert("Provider added successfully!");
        // Optionally, reset the form
        setFirstName("");
        setLastName("");
        setContactNumber("");
        setEmail("");
        setUsername("");
        setProfession("");
        setAreaOfOperation("");
        setYearsExperience("");
        setWorkingHoursFrom("");
        setWorkingHoursTill("");
        setIdType("");
        setIdentityNumber("");
        setDegreeName("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        setDegree(null);
        setIdentityCard(null);
      })
      .catch((err) => {
        console.error("Error: ", err);
        setErrors(err.payload || {});
      });
  };
  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins">
      <h1 className="mb-2 font-medium">Add New Provider</h1>
      <div className="bg-white shadow-sm flex flex-col gap-4 p-4">
        {/* Personal Information */}
        <div>
          <h1 className="border-b-[1.4px] border-black font-inter pb-1 font-semibold">
            Personal Information
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-between p-2">
            <div className="picture flex flex-col items-center">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
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
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                  accept="image/*"
                  required
                />
                <button
                  type="button"
                  className="bg-[#B80000] text-white px-4 py-2 rounded-md"
                  onClick={handleImageRemove}
                >
                  Remove Photo
                </button>
              </div>
            </div>

            <div className="info w-full md:w-2/3 mt-6 md:mt-0 text-sm">
              <form action="#" className="space-y-4 p-4" onSubmit={handleSubmit}>
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      value={contactNumber}
                      onChange={(phone) => setContactNumber(phone)}
                      inputClass={`w-full border p-2 rounded-md ${err.phone ? 'border-red-500' : ''}`}
                      inputStyle={{ width: "100%" }}
                      containerClass="border rounded-md w-full"
                      required
                    />
                    {err.phone && <p className="text-red-500 text-sm">{err.phone}</p>}
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-1">
                      Email
                    </label>
                    <div className={`flex items-center border p-2 rounded-md w-full ${err.email ? 'border-red-500' : ''}`}>
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        className="flex-1 bg-transparent outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {err.email && <p className="text-red-500 text-sm">{err.email}</p>}
                  </div>
                </div>

                {/* Username Field */}
                <div className="flex flex-col">
                  <label htmlFor="username" className="mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    className={`border p-2 rounded-md w-full ${err.username ? 'border-red-500' : ''}`}
                  />
                  {err.username && <p className="text-red-500 text-sm">{err.username}</p>}
                </div>
              </form>
            </div>
          </div>
        </div> 

        {/* Professional Information */}
        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
            Professional Information
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="profession" className="mb-1">
                    Profession
                  </label>
                  <select
                    name="profession"
                    id="profession"
                    className="border p-2 rounded-md w-full"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value={10}>Engineer</option> {/* Assuming job_id=10 for Engineer */}
                    <option value={11}>Doctor</option> {/* Assuming job_id=11 for Doctor */}
                    {/* Add more options with corresponding job_id values as needed */}
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
                    value={areaOfOperation}
                    onChange={(e) => setAreaOfOperation(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {/* Dynamically populate dropdown with categories */}
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading categories...</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="experience" className="mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    id="experience"
                    placeholder="Years of Experience"
                    className="border p-2 rounded-md w-full"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    min="0"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="workingHours" className="mb-1">
                    Working Hours
                  </label>
                  <div className="flex gap-4 flex-col md:flex-row">
                    <input
                      type="time"
                      name="workingHoursFrom"
                      id="workingHoursFrom"
                      placeholder="From"
                      className="border p-2 rounded-md"
                      value={workingHoursFrom}
                      onChange={(e) => setWorkingHoursFrom(e.target.value)}
                      min="0"
                      max="23"
                      required
                    />
                    <input
                      type="time"
                      name="workingHoursTill"
                      id="workingHoursTill"
                      placeholder="Till"
                      className="border p-2 rounded-md"
                      value={workingHoursTill}
                      onChange={(e) => setWorkingHoursTill(e.target.value)}
                      min="0"
                      max="23"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-inter font-semibold">
            Documents
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex gap-4 w-full flex-col md:flex-row">
                  <div className="flex flex-col">
                    <label htmlFor="idType" className="mb-1">
                      Identity Type
                    </label>
                    <select
                      name="idType"
                      id="idType"
                      className="border p-2 rounded-md"
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="NationalId">National ID</option>
                      <option value="NationalPassport">National Passport</option>
                      <option value="DrivingLicense">Driver License</option>
                      <option value="TradeId">Trade ID</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="identityNumber" className="mb-1">
                      Identity Number
                    </label>
                    <input
                      type="text"
                      name="identityNumber"
                      id="identityNumber"
                      placeholder="Identity Number"
                      className="border p-2 rounded-md"
                      value={identityNumber}
                      onChange={(e) => setIdentityNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="nameOfDegree" className="mb-1">
                    Name of the Degree
                  </label>

                  <select
                    name="nameOfDegree"
                    id="nameOfDegree"
                    className="border p-2 rounded-md w-full"
                    value={degreeName}
                    onChange={(e) => setDegreeName(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="BBA">BBA</option>
                    <option value="MBA">MBA</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                {/* Upload Identity */}
                <div className="flex flex-col w-full relative">
                  <div
                    className="border-dashed border-2 border-gray-400 p-2 rounded-md w-full cursor-pointer"
                    onClick={() => identityInputRef.current.click()} // Trigger file input click
                  >
                    <span className="text-gray-400">Upload your Identity</span>
                    <FaPaperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <input
                    type="file"
                    ref={identityInputRef}
                    className="hidden"
                    name="identity_card" // Ensure the name matches what the backend expects
                    id="identity"
                    accept=".jpeg, .png, .jpg, .pdf" // Restrict to allowed file types
                    onChange={handleIdentityCardUpload} // Correct handler
                  />
                </div>

                {/* Upload Degree */}
                <div className="flex flex-col w-full relative">
                  <div
                    className="border-dashed border-2 border-gray-400 p-2 rounded-md w-full cursor-pointer"
                    onClick={() => degreeInputRef.current.click()} // Trigger file input click
                  >
                    <span className="text-gray-400">Upload your Degree</span>
                    <FaPaperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </div>
                  <input
                    type="file"
                    ref={degreeInputRef}
                    className="hidden"
                    name="degree"
                    id="degree"
                    accept=".jpeg, .png, .jpg, .pdf" // Restrict to allowed file types
                    onChange={handleDegreeUpload} // Correct handler
                  />
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* Password */}
        <div className="mt-6">
          <h1 className="border-b-[1.4px] border-black pb-1 font-semibold">
            Password
          </h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm" onSubmit={handleSubmit}>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 mt-6 text-sm">
          <button
            type="button"
            className="bg-[#D9D9D9] text-white px-4 py-2 rounded-md"
            onClick={() => {
              // Optionally, implement cancel functionality
              // For example, navigate back or reset the form
              window.location.reload();
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#0085FF] text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 mt-4">
            {typeof error === "string" ? error : "An error occurred."}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewProvider;