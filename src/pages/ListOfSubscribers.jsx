import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import SubscriptionPackageListTable from "../components/SubscriptionPackageListTable";

const ListOfSubscribers = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Subscriptions"); // State for selected filter

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle filter selection
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="m-8">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          List of Subscriber
        </h2>
        <div className="flex items-center flex-col flex-wrap md:flex-row gap-4 mb-10 font-poppins">
          <div className="flex flex-col bg-[#FF4200] w-[210px] text-white px-2 py-4 rounded-md">
            <h1 className="font-medium">56</h1>
            <p className="text-[12px]">Total Subscribers</p>
          </div>
          <div className="flex flex-col bg-[#0085FF] text-white px-2 py-4 rounded-md w-[210px]">
            <h1 className="font-medium">56</h1>
            <p className="text-[12px]">Premium Plan Subscribers</p>
          </div>
          <div className="flex flex-col bg-[#009F9B] text-white px-2 py-4 rounded-md w-[210px]">
            <h1 className="font-medium">80</h1>
            <p className="text-[12px]">Standard Plan Subscribers</p>
          </div>
          <div className="flex flex-col bg-[#16423C] w-[210px] text-white px-2 py-4 rounded-md">
            <h1 className="font-medium">100</h1>
            <p className="text-[12px]">Basic Plan Subscribers</p>
          </div>
        </div>
        <div className="flex justify-end mt-6 relative">
          {/* Dropdown Menu */}
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-[#888888] px-4 py-2 rounded-md shadow border-2 border-[#BABABA]"
          >
            <span>{selectedFilter}</span>
            <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <ul className="absolute text-center top-full mt-1 w-48 bg-white text-[#0000009C] shadow-lg rounded-md py-2 z-50">
              {/* Positioned directly below the button */}
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterSelect("All Subscriptions")}
              >
                All Subscriptions
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterSelect("Premium Plan")}
              >
                Premium Plan
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterSelect("Standard Plan")}
              >
                Standard Plan
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterSelect("Basic Plan")}
              >
                Basic Plan
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleFilterSelect("Expired Subscription")}
              >
                Expired Subscription
              </li>
            </ul>
          )}
        </div>

        
        <SubscriptionPackageListTable filter={selectedFilter} />
      </div>
    </div>
  );
};

export default ListOfSubscribers;
