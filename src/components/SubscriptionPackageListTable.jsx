import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import notificationImg from "../Assets/notificationImg.png";

const SubscriptionPackageListTable = ({ filter }) => {
  const [activePopup, setActivePopup] = useState(null);

  // All requests data
  const allRequests = [
    {
      id: 1,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Premium Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 2,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Standard Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 3,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Premium Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 4,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Standard Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 5,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Premium Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 6,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Basic Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 7,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Standard Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 8,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Standard Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 9,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Basic Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 10,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Basic Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 11,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Basic Plan",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 12,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Expired Subscription",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 13,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Expired Subscription",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
    {
      id: 14,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      packagename: "Expired Subscription",
      startdate: "12-08-2024",
      lastrenewed: "5",
      status: "active",
      image: notificationImg,
    },
  ];

  // Filter requests based on the selected filter
  const filteredRequests = allRequests.filter((request) =>
    filter === "All Subscriptions" ? true : request.packagename === filter
  );

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActivePopup(null);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Stop event propagation on popup toggle click
  const handlePopupClick = (e, id) => {
    e.stopPropagation();
    togglePopup(id);
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-20">
        <thead>
          <tr className="bg-[#8498E0] text-white text-xs text-center">
            <th className="p-3">
              <span className="block py-2 px-3 border-r border-gray-300">
                Sl
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">
                Provider
              </span>
            </th>
            <th className="p-0 hidden sm:table-cell">
              <span className="block py-2 px-3 border-r border-gray-300">
                Contact
              </span>
            </th>
            <th className="p-0 hidden sm:table-cell">
              <span className="block py-2 px-3 border-r border-gray-300">
                Category
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">
                Package Name
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">
                Start Date
              </span>
            </th>
            <th className="p-0 hidden sm:table-cell">
              <span className="block py-2 px-3 border-r border-gray-300">
                End Date
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3 border-r border-gray-300">
                Status
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr
              key={request.id}
              className="border-b border-gray-200 text-center text-xs font-Inter"
            >
              <td className="p-3 text-center">{`0${index + 1}`}</td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src={request.image}
                    alt="Provider"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{request.name}</span>
                </div>
              </td>
              <td className="p-4 hidden sm:table-cell">{request.contact}</td>
              <td className="p-4 hidden sm:table-cell">{request.category}</td>
              <td className="p-4">{request.packagename}</td>
              <td className="p-4">{request.lastrenewed}</td>
              <td className="p-4 hidden sm:table-cell">{request.startdate}</td>
              <td className="p-4">
                <span className="rounded-md px-3 py-1 text-xs md:text-sm bg-[#85FF674D] text-[#21A600]">
                  {request.status}
                </span>
              </td>
              <td
                className="relative p-2 md:p-4"
                onClick={(e) => handlePopupClick(e, request.id)}
              >
                <BsThreeDots className="h-5 w-5 text-[#707070] ml-4 cursor-pointer" />
                {activePopup === request.id && (
                  <div className="absolute right-0 top-8 bg-white text-center flex-col justify-center items-center mr-0 sm:mr-10 inline-block py-2 px-4 rounded-lg text-[#0000009C] shadow-lg border-2 z-50">
                    <h1 className="cursor-pointer text-xs md:text-sm">Edit</h1>
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
  );
};

export default SubscriptionPackageListTable;
