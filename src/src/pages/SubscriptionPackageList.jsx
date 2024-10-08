import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SubscriptionPackageList = () => {
  const [activePopup, setActivePopup] = useState(null);

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  const subscriptionPackages = [
    {
      id: 1,
      packageName: "Basic Plan",
      price: "$200.00",
      duration: "120 days",
      subscribers: "20",
      status: true,
    },
    {
      id: 2,
      packageName: "Standard Plan",
      price: "$500.00",
      duration: "90 days",
      subscribers: "10",
      status: false,
    },
    {
      id: 3,
      packageName: "Premium Plan",
      price: "$700.00",
      duration: "30 days",
      subscribers: "30",
      status: true,
    },
  ];
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Full-screen background */}
      <div className="m-8 ">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          Subscription Package List
        </h2>
        <div className="flex md:gap-8 gap-4 flex-wrap items-center justify-center md:justify-start font-poppins">
          <div className="flex flex-col bg-[#0085FF] w-[180px] text-white px-4 pr-14 py-2 rounded-md">
            <h1 className="font-medium">$700.00</h1>
            <p className="text-sm">Premium Plan</p>
          </div>
          <div className="flex flex-col bg-[#007C1B] w-[180px] text-white px-4 pr-14 py-2 rounded-md">
            <h1 className="font-medium">$500.00</h1>
            <p className="text-sm">Standard Plan</p>
          </div>
          <div className="flex flex-col bg-[#BC0000] w-[180px] text-white px-4 pr-14 py-2 rounded-md">
            <h1 className="font-medium">$100.00</h1>
            <p className="text-sm">Basic Plan</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="flex items-center space-x-2 bg-[#0085FF] text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/new-subscription-plan")}>
            <FaPlus />
            <span>Add New Subscription Plan</span>
          </button>
        </div>

        {/* Table starts here */}
        <div className="mt-8 relative overflow-auto">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white border mb-20 font-inter">
              <thead>
                <tr className="bg-[#2B4DC994] text-center text-xs md:text-sm font-thin text-white">
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      ID
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      Package Name
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      Price
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      Current Subscriber
                    </span>
                  </th>
                  <th className="p-0">
                    <span className="block py-2 px-3 border-r border-gray-300">
                      Duration
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
                {subscriptionPackages.map((pkg, index) => (
                  <tr
                    key={pkg.id}
                    className="border-b text-xs md:text-sm text-center text-gray-800"
                  >
                    <td className="p-2 md:p-4">{`0${index + 1}`}</td>
                    <td className="p-2 md:p-4">{pkg.packageName}</td>
                    <td className="p-2 md:p-4">{pkg.price}</td>
                    <td className="p-2 md:p-4">{pkg.duration}</td>
                    <td className="p-2 md:p-4">{pkg.subscribers}</td>
                    <td className="p-2 md:p-4">
                      <label className="relative inline-block">
                        <input
                          type="checkbox"
                          className="peer invisible"
                          checked={pkg.status}
                        />
                        <span className="absolute top-0 left-0 w-7 h-4 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                        <span className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-3"></span>
                      </label>
                    </td>
                    <td className="relative p-2 md:p-4">
                      <BsThreeDots
                        className="h-5 w-5 text-[#707070] ml-4 cursor-pointer"
                        onClick={() => togglePopup(pkg.id)}
                      />
                      {activePopup === pkg.id && (
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

export default SubscriptionPackageList;