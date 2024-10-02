import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import notificationImg from "../Assets/notificationImg.png"; // Default image for providers without one
import { fetchProviders } from "../features/providerSlice"; // Assuming this is the correct path

const OnboardTable = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [activePopup, setActivePopup] = useState(null);

  // Fetching providers from the Redux store
  const { providers, loading, error } = useSelector((state) => state.providers);

  // Dispatch fetchProviders when the component mounts
  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  // Filter requests based on the active tab
  const filteredRequests =
    activeTab === "onboarding"
      ? providers
      : providers.filter((request) => request.status === "inactive"); // Assuming "inactive" is for denied requests

  return (
    <div className="mt-4 overflow-x-auto">
      {loading ? (
        <p>Loading providers...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
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
                  Rating
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Professional Status
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
                      src={request.image || notificationImg} // Use default image if request.image is null
                      alt="Provider"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{`${request.first_name} ${request.last_name}`}</span>
                  </div>
                </td>
                <td className="p-3 text-center ">{request.phone || "N/A"}</td>
                <td className="p-3 text-center">
                  {request.category?.title || "N/A"} {/* Extract the category title */}
                </td>
                <td className="p-3 text-center">
                  {request.sub_categories_id || "N/A"}
                </td>
                <td className="p-3 text-center">
                  {request.average_rating || "N/A"}
                </td>
                <td className="p-3 text-center">
                  {request.professional_status || "N/A"}
                </td>
                <td className="p-3 text-center">{request.city || "N/A"}</td>
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
      )}
    </div>
  );
};

export default OnboardTable;
