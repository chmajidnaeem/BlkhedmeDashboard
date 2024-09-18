import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import notificationImg from '../Assets/notificationImg.png'

const ProviderList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [availability, setAvailability] = useState({});
  const [status, setStatus] = useState({});

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  
  const providers = [
    {
      id: 1,
      name: 'John Martin',
      email: 'providerrequest@gmail.com',
      phone: '+96213105164',
      category: 'Electricity',
      views: 89,
      reports: 5,
      calls: 89,
      rating: 4.5,
      imageUrl: notificationImg,
      isAvailable: true,
      isActive: true,
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'providerrequest2@gmail.com',
      phone: '+96213105165',
      category: 'Plumbing',
      views: 50,
      reports: 2,
      calls: 50,
      rating: 4.2,
      imageUrl: notificationImg,
      isAvailable: false,
      isActive: false,
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'providerrequest3@gmail.com',
      phone: '+96213105166',
      category: 'Cleaning',
      views: 100,
      reports: 3,
      calls: 100,
      rating: 4.8,
      imageUrl: notificationImg,
      isAvailable: true,
      isActive: true,
    },
    {
      id: 4,
      name: 'John Martin',
      email: 'providerrequest@gmail.com',
      phone: '+96213105164',
      category: 'Electricity',
      views: 89,
      reports: 5,
      calls: 89,
      rating: 4.5,
      imageUrl: notificationImg,
      isAvailable: true,
      isActive: true,
    },
    {
      id: 5,
      name: 'Jane Doe',
      email: 'providerrequest2@gmail.com',
      phone: '+96213105165',
      category: 'Plumbing',
      views: 50,
      reports: 2,
      calls: 50,
      rating: 4.2,
      imageUrl: notificationImg,
      isAvailable: false,
      isActive: false,
    },
    {
      id: 6,
      name: 'Alex Johnson',
      email: 'providerrequest3@gmail.com',
      phone: '+96213105166',
      category: 'Cleaning',
      views: 100,
      reports: 3,
      calls: 100,
      rating: 4.8,
      imageUrl: notificationImg,
      isAvailable: true,
      isActive: true,
    },
  ];

  const toggleAvailability = (id) => {
    setAvailability((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleStatus = (id) => {
    setStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
const navigate = useNavigate();
  return (
    <div className="space-y-2">
     
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full"> */}
      <div className='flex flex-wrap lg:flex-nowrap mt-4 items-center justify-center gap-4 font-poppins'>
        <div className="bg-[#0085FF] text-white py-4 px-2 rounded-lg shadow-lg w-[180px]">
          <h3 className="font-bold text-lg">12,524</h3>
          <p className='text-[12px]'>All Providers</p>
        </div>
        <div className="bg-[#007C1B] text-white py-4 px-2 rounded-lg shadow-lg w-[180px]">
          <h3 className="font-bold text-lg">8,245</h3>
          <p className='text-[12px]'>Active Providers</p>
        </div>
        <div className="bg-[#BC0000] text-white py-4 px-2 rounded-lg shadow-lg w-[180px]">
          <h3 className="font-bold text-lg">2,356</h3>
          <p className='text-[12px]'>Inactive Providers</p>
        </div>
        <div className="bg-[#FF8407] text-white py-4 px-2 rounded-lg shadow-lg w-[180px]">
          <h3 className="font-bold text-lg">124</h3>
          <p className='text-[12px]'>New Provider Requests</p>
        </div>
        <div className="bg-[#344A7A] text-white py-4 px-2 rounded-lg shadow-lg w-[180px]">
          <h3 className="font-bold text-lg">534</h3>
          <p className='text-[12px]'>Reports</p>
        </div>
      </div>

    
      <div className="flex justify-end pt-4 pr-4  w-full font-poppins">
        <button className="bg-[#0085FF] text-white text-sm px-6 py-2 rounded-lg shadow-md"
        onClick={() => navigate("/add-new-provider")}
        >Add New</button>
      </div>


      <div className="flex space-x-4 border-b font-poppins">
        <button className="font-semibold text-blue-500 text-md">All</button>
        <button className="font-regular text-gray-500 text-sm">Active</button>
        <button className="font-regular text-gray-500 text-sm">Inactive</button>
      </div>

  
      <div className="w-full overflow-x-auto px-1">
  <table className="bg-white shadow-md rounded-lg text-sm table-auto w-full font-inter">
  <thead>
  <tr className="text-center bg-[#2b4dc974] text-white text-[10px] md:text-[12px] h-14 ">
    <th className="relative p-1 lg:p-3">
      <input type="checkbox" />
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      SL
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Provider
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Rating
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Contact
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Category
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Number of Views
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Number of Reports
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Number of Calls
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Service Availability
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="relative p-1 lg:p-3">
      Status
      <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
    </th>
    <th className="p-1 lg:p-3">Actions</th>
  </tr>
</thead>

    <tbody>
      {providers.map((provider, index) => (
        <tr key={provider.id} className="border-b text-[10px] text-center">
          <td className="p-2">
            <input type="checkbox" />
          </td>
          <td>{index + 1}</td>
          <td className="p-2">
            <div className="flex items-center flex-col lg:flex-row">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              {provider.name}
            </div>
          </td>
          <td className="p-2">
            <div className="flex items-center justify-center">
              <FaStar className="text-yellow-500 mr-1" />
              {provider.rating}
            </div>
          </td>
          <td className="p-2 text-center">
            {provider.email}
            <br />
            {provider.phone}
          </td>
          <td className="p-2">{provider.category}</td>
          <td className="p-2">{provider.views}</td>
          <td className="p-2">{provider.reports}</td>
          <td className="p-2">{provider.calls}</td>
          <td className="p-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={availability[provider.id] ?? provider.isAvailable}
                onChange={() => toggleAvailability(provider.id)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </td>
          <td className="p-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status[provider.id] ?? provider.isActive}
                onChange={() => toggleStatus(provider.id)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </td>
          <td className="relative p-2">
            <button
              className="hover:bg-gray-100 cursor-pointer p-1 rounded-full"
              onClick={() => toggleDropdown(index)}
            >
              <FiMoreVertical />
            </button>
            {dropdownOpen === index && (
              <div className="absolute right-0 top-8 bg-white border shadow-md z-10 w-36 text-[10px]">
                <ul>
                  <li className="hover:bg-gray-100 cursor-pointer p-2">Edit</li>
                  <li className="hover:bg-gray-100 cursor-pointer p-2">Delete</li>
                </ul>
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

export default ProviderList;
