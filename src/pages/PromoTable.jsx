import React from "react";
import { BsThreeDots } from "react-icons/bs";

const PromoTable = () => {
  const services = [
    {
      id: 1,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    {
      id: 2,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    {
      id: 3,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    {
      id: 4,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    {
      id: 5,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    {
      id: 6,
      name: "Tap repair Service",
      category: "Plumbing",
      startDate: "12 Aug, 2024",
      endDate: "26 Aug, 2024",
      views: "12.5k",
      clicks: "10.5k",
      revenue: "10.5k",
      status: true,
    },
    // Add more services here as needed
  ];

  return (
    <div className="mt-4 ">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border ">
          <thead>
            <tr className="bg-[#2B4DC994] text-left text-sm font-thin text-white">
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  {" "}
                  SL
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  {" "}
                  Name
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Category
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  {" "}
                  Start Date
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  End Date
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  {" "}
                  No. of Views
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  {" "}
                  No. of Clicks
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Revenue
                </span>
              </th>
              <th className="p-0 ">
                <span className="block py-2 px-3 border-r border-gray-300">
                  Status
                </span>
              </th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="border-b text-sm text-gray-800">
                <td className="p-4">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </td>
                <td className="p-4">{`0${index + 1}`}</td>
                <td className="p-4">{service.name}</td>
                <td className="p-4">{service.category}</td>
                <td className="p-4">{service.startDate}</td>
                <td className="p-4">{service.endDate}</td>
                <td className="p-4">{service.views}</td>
                <td className="p-4">{service.clicks}</td>
                <td className="p-4">{service.revenue}</td>
                <td className="p-4">
                  <label className="relative inline-block">
                    <input type="checkbox" className="peer invisible" />
                    <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                    <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                  </label>
                </td>
                <td className="p-4">
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

export default PromoTable;