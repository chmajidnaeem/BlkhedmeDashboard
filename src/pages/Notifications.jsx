import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushNotification, fetchAllUsers } from '../features/notificationSlice';
import gallery from "../Assets/gallery.png";
import NotificationsTable from '../components/NotificationsTable'; 
import { MdOutlineAttachment } from "react-icons/md";

const Notifications = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.notifications.users);
  const notificationStatus = useSelector((state) => state.notifications.notificationStatus);


  const [fileImage, setfileImage] = useState("")
  const [fileDoc, setfileDoc] = useState("")
  const [file, setfile] = useState("")
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceType: 'provider',
    city: '',
    image: null,
    userIds: [],
  });

  useEffect(() => {
    // Fetch all users when the component mounts
    dispatch(fetchAllUsers());
  }, [dispatch]);



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(pushNotification(formData));
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
  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    setfile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setfileDoc(reader.result);
        console.log(fileDoc)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="overflow-x-auto">
      <div className="">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          Push Notification
        </h2>
        <div className="bg-white p-4 md:p-6 rounded-md shadow-lg w-full font-poppins">
          <form className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            {/* left side */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter the Title"
                  className="border border-gray-300 p-4 w-full rounded-lg text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter Description"
                  className="border border-gray-300 p-4 rounded-lg w-full h-40 text-sm"
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <label className="flex items-center ml-2">
                    Resources Type:
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="resourceType" value="service" />
                    <span className="ml-2">Providers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="resourceType" value="link" />
                    <span className="ml-2">Seekers</span>
                  </label>
                </div>
              </div>
              {/* city and user input */}
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Select User"
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col md:flex-row items-center justify-center py-4 md:py-10 gap-4">
                <label htmlFor='file' className="flex flex-col items-center max-w-xs md:max-w-sm w-[250px] h-[150px] p-4 rounded-xl border-2 border-dashed border-gray-300">
                  <img
                    src={ fileImage || gallery}
                    alt="gallery"
                    className="w-12 h-12 opacity-40"
                  />
                  <h1 className="text-gray-500 font-poppins text-xs mt-2">
                    Upload or Drag Photo
                  </h1>
                </label>
                <input type='file' id='file' className='hidden' onChange={handleImageUpload}/>
                <div className="flex flex-col justify-center text-center md:text-left text-xs">
                  <h1 className="text-gray-600">
                    Image format - jpg png jpeg gif
                    <br />
                    Image size - maximum 2 MB
                    <br />
                    Image Ratio - 2:1
                  </h1>
                </div>
              </div>

              {/* attachment input */}
              <label htmlFor='Doc' className="relative mb-4">
              <div className='border-2 p-2 border-dotted border-gray-300 rounded-lg w-full md:w-[250px] text-sm'>Attach document 
              <MdOutlineAttachment className="absolute right-4 md:right-60 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              </label>
              <input
                type="file"
                placeholder="Attach document"
                onChange={handleDocUpload}
                id='Doc'
                // className="p-2 border-2 border-dotted border-gray-300 rounded-lg  text-sm"
                className="hidden p-2 border-2 border-dotted border-gray-300 rounded-lg w-full md:w-[250px] text-sm"
              />
              <p className="text-md font-poppins text-gray-600 mt-2 mb-4">
                {file.name}  
              </p>
              <p className="text-xs font-poppins text-gray-600 mt-2 mb-4">
                File size - maximum size 2 MB  
              </p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-end items-center gap-4 w-full">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 w-full md:w-auto rounded-lg mb-2 md:mb-0"
                >
                  RESET
                </button>
                <button
                onClick={handleSubmit}
                  type="submit"
                  className="bg-blue-500 px-4 py-2 w-full md:w-auto rounded-lg text-white"
                >
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>
        <NotificationsTable users={users} />
      </div>
    </div>
  );
};

export default Notifications;
