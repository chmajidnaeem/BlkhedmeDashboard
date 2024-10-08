import React from "react";
import { BsThreeDots } from "react-icons/bs";
import notificationImg from "../Assets/notificationImg.png";
import { IoMdStar } from "react-icons/io";

const NotificationsTable = ({ users }) => {
  if (!Array.isArray(users)) {
    return <div>No users found</div>;
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border font-inter">
          <thead>
            <tr className="bg-[#8498E0] text-xs text-center font-thin text-white">
              <th className="p-3 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  SL
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Provider
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Rating
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
                  Number of Views
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Number of Reports
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Number of Calls
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Service Availability
                </span>
              </th>
              <th className="p-0 ">
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
            {users.map((user, index) => (
              <tr key={user.id} className="border-b text-xs text-center text-gray-800">
                <td className="p-3">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <img
                      src={notificationImg}
                      alt="Provider"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <IoMdStar className="text-[#E5801A]" />
                    <span>{user.average_rating || "N/A"}</span>
                  </div>
                </td>
                <td className="p-3">{user.phone || "N/A"}</td>
                <td className="p-3">{user.category || "N/A"}</td>
                <td className="p-3">{user.provider_reviews || "N/A"}</td>
                <td className="p-3">{user.reports || "N/A"}</td>
                <td className="p-3">{user.calls || "N/A"}</td>
                <td className="p-3">
                  <label className="relative inline-block">
                    <input type="checkbox" className="peer invisible" />
                    <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                  </label>
                </td>
                <td className="p-3">
                  <label className="relative inline-block">
                    <input type="checkbox" className="peer invisible" />
                    <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                  </label>
                </td>
                <td className="p-3">
                  <BsThreeDots className="h-6 w-6 text-[#707070]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsTable;
