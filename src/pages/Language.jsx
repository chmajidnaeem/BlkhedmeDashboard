import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const Language = () => {
  const [activePopup, setActivePopup] = useState(null);

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  // Prevent scrolling when popup is active
  React.useEffect(() => {
    document.body.style.overflow = activePopup ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Clean up on unmount
    };
  }, [activePopup]);

  const languageList = [
    {
      id: 1,
      language: "English",
      translation: "View Translation",
      default: "Default Language",
      status: true,
    },
    {
      id: 2,
      language: "Arabic",
      translation: "View Translation",
      default: "Default Language",
      status: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Full-screen background */}
      <div className="m-8">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          Language Setup
        </h2>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full font-poppins mb-8">
          <div className="mb-4">
            <label className="flex items-center ml-2 mb-4">
              Select Language:
            </label>
            <div className="flex flex-col gap-2 md:flex-row md:gap-16">
              <label className="flex items-center">
                <input type="radio" name="resourceType" value="service" />
                <span className="ml-2">English</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resourceType" value="link" />
                <span className="ml-2">Arabic</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end items-center gap-4 w-full">
            <button
              type="button"
              className="bg-gray-300 px-8 py-2 w-full md:w-auto rounded-md mb-2 md:mb-0"
            >
              RESET
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-8 py-2 w-full md:w-auto rounded-md text-white"
            >
              SUBMIT
            </button>
          </div>
        </div>

       
        {/* Table starts here */}
        <div className="mt-4 relative overflow-auto">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border mb-20">
              <thead>
                <tr className="bg-[#2B4DC994] text-center font-inter text-xs md:text-sm font-thin text-white">
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      ID
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      Language
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300 text-xs md:text-sm">
                      Translated Content
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300 text-xs md:text-sm">
                      Default Status
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300 text-xs md:text-sm">
                      Status
                    </span>
                  </th>
                  <th className="p-4 text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {languageList.map((list, index) => (
                  <tr
                    key={list.id}
                    className="border-b text-nowrap text-xs md:text-sm text-center text-gray-800"
                  >
                    <td className="p-2 md:p-4">{`0${index + 1}`}</td>
                    <td className="p-2 md:p-4">{list.language}</td>
                    <td className="p-2 md:p-4">
                      <span className="border border-[#616161] rounded-md text-[#616161] px-2 py-1 md:px-6 md:py-2 text-[10px] h-[30px] md:text-sm">
                        {list.translation}
                      </span>
                    </td>
                    <td className="p-2 md:p-4">
                      <span
                        className={`rounded-md px-2 py-1 md:px-6 md:py-2 text-xs md:text-sm ${
                          list.id === 2
                            ? "bg-[#0085FF4D] text-[#0057A7]"
                            : "bg-[#85FF674D] text-[#21A600]"
                        }`}
                      >
                        {list.default}
                      </span>
                    </td>
                    <td className="p-2 md:p-4">
                      <label className="relative inline-block">
                        <input type="checkbox" className="peer invisible" />
                        <span className="absolute top-0 left-0 w-7 h-4 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                        <span className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-3"></span>
                      </label>
                    </td>
                    <td className="relative p-2 md:p-4">
                      <BsThreeDots
                        className="h-5 w-5 text-[#707070] ml-4 cursor-pointer"
                        onClick={() => togglePopup(list.id)}
                      />
                      {activePopup === list.id && (
                        <div className="absolute right-0 top-8 bg-white flex-col justify-center items-center mr-0 sm:mr-10 inline-block py-2 px-4 rounded-lg text-[#0000009C] shadow-lg border-2 z-50">
                          <h1 className="cursor-pointer text-xs md:text-sm">
                            Edit
                          </h1>
                          <h1 className="cursor-pointer mt-1 text-xs md:text-sm">
                            Delete
                          </h1>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
