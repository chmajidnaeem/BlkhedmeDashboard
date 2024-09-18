import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import notificationImg from "../Assets/notificationImg.png";

const OnboardTable = ({ activeTab }) => {
  const [activePopup, setActivePopup] = useState(null);

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  const allRequests = [
    {
      id: 1,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "wirting",
      providers: "120",
      rejected: "",
      city: "Miami",
      image: notificationImg,
    },
    {
      id: 2,
      name: "Jane Doe",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Plumbing",
      subcategory: "installation",
      providers: "80",
      rejected: "12-08-2024",
      city: "New York",
      image: notificationImg,
    },
    {
      id: 3,
      name: "Alice Smith",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "maintenance",
      providers: "50",
      rejected: "",
      city: "San Francisco",
      image: notificationImg,
    },
    {
      id: 4,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "wirting",
      providers: "120",
      rejected: "",
      city: "Miami",
      image: notificationImg,
    },
    {
      id: 5,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "wirting",
      providers: "120",
      rejected: "",
      city: "Miami",
      image: notificationImg,
    },
    {
      id: 6,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "wirting",
      providers: "120",
      rejected: "",
      city: "Miami",
      image: notificationImg,
    },
    {
      id: 7,
      name: "John Martin",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Electricity",
      subcategory: "wirting",
      providers: "120",
      rejected: "",
      city: "Miami",
      image: notificationImg,
    },
    {
      id: 8,
      name: "Jane Doe",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Plumbing",
      subcategory: "installation",
      providers: "80",
      rejected: "12-08-2024",
      city: "New York",
      image: notificationImg,
    },
    {
      id: 9,
      name: "Jane Doe",
      contact: "providerrequest@gmail.com +96213105164",
      category: "Plumbing",
      subcategory: "installation",
      providers: "80",
      rejected: "12-08-2024",
      city: "New York",
      image: notificationImg,
    },
    // Add more sample requests...
  ];

  // Filter requests based on the active tab
  const filteredRequests =
    activeTab === "onboarding"
      ? allRequests
      : allRequests.filter((request) => request.rejected); // Show only denied requests

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mb-20">
        <thead>
          <tr className="bg-[#8498E0] text-white text-xs text-center">
            <th className="p-3 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                ID
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Provider
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Contact
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Category
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Sub-Category
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Providers
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                Denied Date
              </span>
            </th>
            <th className="p-0 ">
              <span className="block py-2 px-3 border-r border-gray-300">
                City
              </span>
            </th>
            <th className="p-0">
              <span className="block py-2 px-3">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr key={request.id} className="border-b border-gray-200 text-sm">
              <td className="p-3 text-center">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </td>
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
              <td className="p-3 text-center ">{request.contact}</td>
              <td className="p-3 text-center">{request.category}</td>
              <td className="p-3 text-center">{request.subcategory}</td>
              <td className="p-3 text-center">{request.providers}</td>
              <td className="p-3 text-center">{request.rejected || "N/A"}</td>
              <td className="p-3 text-center">{request.city}</td>
              <td className="relative p-2 md:p-4">
                <BsThreeDots
                  className="h-5 w-5 text-[#707070] ml-4 cursor-pointer"
                  onClick={() => togglePopup(request.id)}
                />
                {activePopup === request.id && (
                  <div className="absolute right-0 top-8 bg-white text-center flex-col justify-center items-center mr-0 sm:mr-10 inline-block py-2 px-4 rounded-lg text-[#0000009C] shadow-lg border-2 z-50">
                    <h1 className="cursor-pointer text-xs md:text-sm">
                      Approve
                    </h1>
                    <h1 className="cursor-pointer mt-1 text-xs md:text-sm">
                      Deny
                    </h1>
                    <h1 className="cursor-pointer mt-1 text-xs md:text-sm">
                      View
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

export default OnboardTable;
