import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import gallery from "../Assets/gallery.png";
import { setActiveLink } from "react-scroll/modules/mixins/scroller";

const NewBanner = ({ isOpen, onClose, onAddBanner }) => {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [fileImage, setfileImage] = useState("");
  const [value, setValue] = useState("");
  const [Link, setLink] = useState("");

  if (!isOpen) return null;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setCategoryId(option); // Assuming option is the category ID
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Construct the data to be submitted
    const bannerData = {
      title,
      resource_type: resourceType,
      category_id: categoryId,
      image: fileImage, // Placeholder since we are not uploading an image
      link : Link
    };

    // Call the parent function to submit the data
    onAddBanner(bannerData);

    // Close the modal after submitting
    onClose();
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setfileImage(reader.result);
        console.log(file)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 md:p-0">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-lg md:w-1/2 relative">
        <IoClose
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 cursor-pointer"
          size={24}
        />
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          Promotional Banners
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the Title"
              className="border border-gray-300 p-2 w-full rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-base md:text-lg font-medium mb-2">
              Resources Type
            </label>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="resourceType"
                  value="category"
                  id="1"
                  onChange={(e) => {
                    setResourceType("category wise")
                    setValue(e.target.id)
                    setCategoryId(e.target.id)
                    console.log(value);
                    
                  }}
                />
                <span className="ml-2">Category Wise</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="resourceType"
                  value="service"
                  id="2"
                  onChange={(e) => {
                    setResourceType("service wise")
                    setCategoryId(e.target.id)
                    setValue(e.target.id)
                  }}
                />
                <span className="ml-2">Service Wise</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="resourceType"
                  value="link"
                  id="3"
                  onChange={(e) => {
                    setResourceType("link wise")
                    setValue(e.target.id)
                    setCategoryId(e.target.id)
                  }}
                />
                <span className="ml-2">Redirect Link</span>
              </label>
            </div>
          </div>
          {/* Search input with dropdown */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder={value != "3"? "Search" : "URL"}
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg"
              id="4"
              onChange={(e)=>{
                setCategoryId(e.target.id)
                setLink(e.target.value)
              }}
            />
            <IoIosArrowDown
              onClick={toggleDropdown}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
            {isDropdownOpen && (
              <ul className="absolute top-full right-0 bg-white border border-gray-300 rounded-lg w-full mt-1 shadow-lg">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleOptionClick(3)} // Example category ID
                >
                  Option 1 (Category ID: 3)
                </li>
                {/* Add more options here */}
              </ul>
            )}
          </div>
          {/* Photo upload section (Placeholder image) */}
          <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-10 py-6 md:py-10 gap-4">
            <label htmlFor="file" className="flex flex-col items-center w-full max-w-sm h-[150px] p-4 rounded-xl border-2 border-dashed border-gray-300">
              <img
                src={fileImage || gallery}
                alt="gallery"
                className="w-12 h-12 opacity-40"
              />
              <h1 className="text-gray-500 font-poppins text-xs mt-2">
                Upload or Drag Photo
              </h1>
            </label>
            <input type="file" className="hidden" id="file" onChange={handleImageUpload}/> 
            <div className="flex flex-col justify-center text-center md:text-left">
              <h1 className="text-gray-500 font-poppins text-sm mb-1">
                Upload Cover Photo
              </h1>
              <h1 className="text-xs font-poppins text-gray-600">
                Image format - jpg png jpeg gif, max size - 2 MB, Ratio - 2:1
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-lg mb-2 md:mb-0"
              onClick={onClose}
            >
              RESET
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-lg text-white"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBanner;
