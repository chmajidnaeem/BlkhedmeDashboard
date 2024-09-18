import { FaSearch} from 'react-icons/fa';
import React, { useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import person from "../Assets/person.png";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white w-full flex flex-col-reverse min-[490px]:flex-row gap-4 justify-center items-center p-4 shadow">
      <div className="flex-grow flex justify-between md:justify-center">
        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 min-[490px]:w-1/2 min-w-[120px] border border-black w-full">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent p-2 outline-none w-full"
          />
          <FaSearch className="text-gray-400" />
        </div>
      </div>
      

        <div className="flex items-center gap-4">
          {/* language dropdown */}
          <div className="relative">
            <div
              className="flex items-center bg-gray-200 px-3 py-2 rounded-xl cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <CiGlobe />
              <h1 className="ml-2">{selectedLanguage}</h1>
              <IoMdArrowDropdown className="ml-2" />
            </div>
            {isDropdownOpen && (
              <div
                className="absolute top-full -right-2 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                style={{ width: "100px" }}
              >
                <ul className="list-none p-0 m-0">
                  <li
                    className="p-2 hover:bg-[#2B4DC9] cursor-pointer rounded-t-lg"
                    onClick={() => handleLanguageChange("EN")}
                  >
                    English
                  </li>
                  <li
                    className="p-2 hover:bg-[#2B4DC9] cursor-pointer rounded-b-lg"
                    onClick={() => handleLanguageChange("AR")}
                  >
                    Arabic
                  </li>
                </ul>
              </div>
            )}
          </div>
          <img src={person} alt="person" className="w-8 md:w-10 md:h-10 h-8" />
        </div>
     
      
    </header>
  );
};

export default Topbar;
