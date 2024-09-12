import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const ProviderList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which row's dropdown is open
  const [availability, setAvailability] = useState({});
  const [status, setStatus] = useState({});

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  // Sample data array for providers
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
      imageUrl: 'https://via.placeholder.com/50',
      isAvailable: true,
      isActive: true,
    },
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
      imageUrl: 'https://via.placeholder.com/50',
      isAvailable: true,
      isActive: true,
    },
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
      imageUrl: 'https://via.placeholder.com/50',
      isAvailable: true,
      isActive: true,
    },
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
      imageUrl: 'https://via.placeholder.com/50',
      isAvailable: true,
      isActive: true,
    },
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
      imageUrl: 'https://via.placeholder.com/50',
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

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        <div className="bg-[#0085FF] text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">12,524</h3>
          <p>All Providers</p>
        </div>
        <div className="bg-[#007C1B] text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">8,245</h3>
          <p>Active Providers</p>
        </div>
        <div className="bg-[#BC0000] text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">2,356</h3>
          <p>Inactive Providers</p>
        </div>
        <div className="bg-[#FF8407] text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">124</h3>
          <p>New Provider Requests</p>
        </div>
        <div className="bg-[#344A7A] text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">534</h3>
          <p>Reports</p>
        </div>
      </div>

      
      <div className="flex justify-end w-full">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md">Add New</button>
      </div>

      
      <div className="flex space-x-4 border-b ">
        <button className="font-semibold text-blue-500">All</button>
        <button className="font-semibold text-gray-500">Active</button>
        <button className="font-semibold text-gray-500">Inactive</button>
      </div>

     
      <div className="w-full">
        <table className=" bg-white shadow-md rounded-lg text-sm table-auto">
          <thead>
            <tr className="text-center bg-[#2b4dc974] text-[12px]">
              <th className="">
                <input type="checkbox" />
              </th>
              <th className="p-3">SL</th>
              <th className="p-3">Provider</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Category</th>
              <th className="p-3">Number of Views</th>
              <th className="p-3">Number of Reports</th>
              <th className="p-3">Number of Calls</th>
              <th className="p-3">Service Availability</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider, index) => (
              <tr key={provider.id} className="border-b text-[10px] text-center">
                <td className='p-2'>
                  <input type="checkbox" />
                </td>
                <td>{index + 1}</td>
                <td className="flex w-full  items-center">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-6 h-6 rounded-full mr-1"
                  />
                  {provider.name}
                </td>
                <td className="p-2">
                  <FaStar className="text-yellow-500 mt-4" />
                  {provider.rating}
                </td>
                <td className="p-2 text-center text-[10px]">
                  {provider.email}
                  <br />
                  {provider.phone}
                </td>
                <td className='p-2'>{provider.category}</td>
                <td className='p-2'>{provider.views}</td>
                <td className='p-2'>{provider.reports}</td>
                <td className='p-2'>{provider.calls}</td>
                <td className='p-2'>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availability[provider.id] ?? provider.isAvailable}
                      onChange={() => toggleAvailability(provider.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </td>
                <td className='p-2'>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={status[provider.id] ?? provider.isActive}
                      onChange={() => toggleStatus(provider.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </td>
                <td className="p-2 relative">
  <button onClick={() => toggleDropdown(provider.id)} className="text-gray-600">
    <FiMoreVertical />
  </button>
  {dropdownOpen === provider.id && (
    <div className="absolute right-0 mt-2 w-24 bg-white border rounded-md shadow-lg z-20">
      <ul className="text-sm">
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Edit</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Delete</li>
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
