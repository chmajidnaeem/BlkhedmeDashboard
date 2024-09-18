import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import notificationImg from "../Assets/notificationImg.png";

const SeekerTable = () => {
  const seekers = [
    {
      id: 1,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
    {
      id: 2,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
    {
      id: 3,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
    {
      id: 4,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
    {
      id: 5,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
    {
      id: 6,
      name: "John Martin",
      ratings: "4.5",
      contact: "providerrequest@gmail.com +96213105164",
      calls: "89",
      reviews: "89",
      date: "12 Aug, 2024",
      image: notificationImg,
    },
  ];

  const [activePopup, setActivePopup] = useState(null);

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border font-inter">
          <thead>
            <tr className="bg-[#8498E0] text-[10px] md:text-[12px] text-center text-white">
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
                  Seeker
                </span>
              </th>

              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Contact
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Number of Calls
                </span>
              </th>

              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Number of Reviews
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Joining Date
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
            {seekers.map((seeker, index) => (
              <tr
                key={seeker.id}
                className="border-b text-xs text-center px-2 text-gray-800"
              >
                <td className="p-4">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="p-4">{`0${index + 1}`}</td>
                <td className="p-4">
                  <div className="flex items-center ">
                    <img
                      src={seeker.image}
                      alt="Provider"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{seeker.name}</span>
                  </div>
                </td>
                <td className="p-4">{seeker.contact}</td>
                <td className="p-4">{seeker.calls}</td>
                <td className="p-4">{seeker.reviews}</td>
                <td className="p-4">{seeker.date}</td>
                <td className="p-4">
                  <label className="relative inline-block">
                    <input type="checkbox" className="peer invisible" />
                    <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                  </label>
                </td>
                <td className="relative p-2 md:p-4">
                  <BsThreeDots
                    className="h-5 w-5 text-[#707070] ml-4 cursor-pointer"
                    onClick={() => togglePopup(seeker.id)}
                  />
                  {activePopup === seeker.id && (
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
  );
};

export default SeekerTable;
