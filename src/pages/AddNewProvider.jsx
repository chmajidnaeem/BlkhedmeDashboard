import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import uploadImg from "../Assets/download.svg";
import FileUpload from "../components/FileUpload";
import { addProvider } from "../features/providerSlice"; // Adjust the path as necessary
import { fetchCategories } from "../features/categorySlice";

const AddNewProvider = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.providers);
  const { categories, categoryError } = useSelector((state) => state.categories);
  const [err, setErrors] = useState({});

  // Fetching categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // State for Personal Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  // State for Professional Information
  const [profession, setProfession] = useState("");
  const [areaOfOperation, setAreaOfOperation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [workingHoursFrom, setWorkingHoursFrom] = useState("");
  const [workingHoursTill, setWorkingHoursTill] = useState("");

  // State for Documents (Excluded from submission)
  const [idType, setIdType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [documents, setDocuments] = useState([]);

  // State for Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for Image
  const [selectedImage, setSelectedImage] = useState(null);

  // Handler for FileUpload component to pass uploaded files to parent
  const handleFilesUpload = (uploadedFiles) => {
    setDocuments(uploadedFiles);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare the new provider data (Exclude problematic fields)
    const newProvider = {
      first_name: firstName,
      last_name: lastName,
      phone: contactNumber,
      email: email,
      profession: profession, // Correctly mapped to 'profession'
      area_of_operation: areaOfOperation,
      years_experience: yearsExperience,
      working_hours_from: workingHoursFrom,
      working_hours_till: workingHoursTill,
      password: password,
      password_confirmation: confirmPassword, // Ensure backend handles this
      // Conditionally include 'image' only if an image was uploaded
      ...(selectedImage && { image: selectedImage }),
      // Excluded Fields:
      // identity_type: idType,
      // identity_number: identityNumber,
      // name_of_degree: degreeName, 
      name_of_degree: degreeName, // Correctly mapped to 'name_of_degree'
    };


    // Dispatch the addProvider action
    dispatch(addProvider(newProvider))
      .unwrap()
      .then((response) => {
        alert("Provider added successfully!");
        // Optionally, reset the form
        setFirstName("");
        setLastName("");
        setContactNumber("");
        setEmail("");
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
        setSelectedImage(null);
        setDocuments([]);
      })
      .catch((err) => {
        // Log the entire error for debugging
        console.error("Error Message front: ", err);
  
        // Initialize an empty object to hold error messages
        const errorMessages = {};
  
        // Check if the error has a payload (common in Redux Toolkit)
        if (err.payload) {
          const apiErrors = err.payload;
  
          // Map backend errors to form fields
          if (apiErrors.email) {
            errorMessages.email = apiErrors.email[0];
          }
          if (apiErrors.phone) {
            errorMessages.phone = apiErrors.phone[0];
          }
  
          // Add any general errors if present
          if (apiErrors.general) {
            errorMessages.general = apiErrors.general[0];
          }
        } else if (err.message) {
          // Fallback if error structure is different
          if (err.message.email) {
            errorMessages.email = err.message.email[0];
          }
          if (err.message.phone) {
            errorMessages.phone = err.message.phone[0];
          }
        }
  
        // Update the error state
        setErrors(errorMessages);
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

              <div className="">
                <FileUpload onFilesUpload={handleFilesUpload} />
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