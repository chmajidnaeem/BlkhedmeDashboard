import React, { useState, useRef, useEffect } from "react";
import { FaBuffer, FaRegImage } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategory, clearSubCategory } from '../redux/slices/subcategorySlice';
import axios from 'axios';

const SubCategorySetup = () => {
  const [language, setLanguage] = useState("default");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [showUploadArea, setShowUploadArea] = useState(true);
  const [locations, setLocations] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state.subCategory);
  
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setShowUploadArea(false);
    }
  };

  const handleClickUpload = (event) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fetchLocations = async () => {
    try {
      const { data } = await axios.get('https://apiv2.blkhedme.com/api/locations/show');
      setLocations(data.location);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('description', description);
    formData.append('city', selectedCity);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await axios.post('/api/subcategories', formData);
      if (response.data.success) {
        // Optionally reset the form state here
        setCategoryName('');
        setDescription('');
        setSelectedCity('');
        setSelectedFile(null);
        setShowUploadArea(true);
        
        // Fetch subcategories after a successful submission
        dispatch(fetchSubCategory(response.data.id)); // Adjust based on your response structure
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
    return () => {
      dispatch(clearSubCategory()); // Clear subcategory on unmount
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-black mb-6">Sub Category Setup</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${language === "default" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setLanguage("default")}
            >
              Default
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${language === "english" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setLanguage("english")}
            >
              English
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${language === "arabic" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setLanguage("arabic")}
            >
              Arabic - العربية
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Category Name (Default)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaBuffer className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Enter Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full pl-10 p-3 border rounded-md focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-semibold mb-2">
              Select City
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-1/2 md:w-full p-3 border rounded-md focus:outline-none"
              >
                <option value="">Select City</option>
                {locations.map((location, index) => (
                  <option value={location.id} key={index}>{location.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-600 font-semibold mb-2">Description (Default)</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md focus:outline-none p-3 min-h-32"
            ></textarea>
          </div>

          {showUploadArea ? (
            <div
              className="mb-6 border-2 border-dashed border-gray-300 rounded-md flex justify-center items-center h-48 cursor-pointer relative"
            >
              <div className="text-center">
                <FaRegImage className="h-16 w-16 mx-auto mb-4 text-gray-400" onClick={handleClickUpload} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <p className="text-gray-500">Upload Photo</p>
                <p className="text-gray-400 text-xs mt-2">
                  Image format - jpg png jpeg gif image <br />
                  size - maximum size 2 MB Image Ratio - 1:1
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <p className="text-gray-600">Selected File:</p>
              <p className="text-gray-500">{selectedFile.name}</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md" onClick={() => setShowUploadArea(true)}>
              RESET
            </button>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
              SUBMIT
            </button>
          </div>
        </form>

        {subCategory.loading && <p>Loading...</p>}
        {subCategory.error && <p className="text-red-500">{subCategory.error}</p>}
        {subCategory.data && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Subcategory Details</h2>
            <pre>{JSON.stringify(subCategory.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategorySetup;
