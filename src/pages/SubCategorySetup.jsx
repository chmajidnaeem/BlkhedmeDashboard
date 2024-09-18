import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SubCategorySetup = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Office Shifting",
      ParentCategory: "Shifting",
      NumberOfProvider: 89,
      isFeatured: true,
    },
    {
      id: 2,
      name: "Bachelor Shifting",
      ParentCategory: "Shifting",
      NumberOfProvider: 89,
      isFeatured: true,
    },
    {
      id: 3,
      name: "Interior Design",
      ParentCategory: "Painting and Renovation",
      NumberOfProvider: 89,
      isFeatured: true,
    },
    
  ]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };


  const toggleFeatured = (index) => {
    const updatedCategories = categories.map((category, i) =>
      i === index ? { ...category, isFeatured: !category.isFeatured } : category
    );
    setCategories(updatedCategories);
  };
  const navigate = useNavigate()

  return (
    <> 
    <div className="space-y-2 font-poppins">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Sub Category Setup</h1>
       
    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md"
    onClick={() => navigate("/add-new-sub-category")}
    >Add New</button>
  
      </div>
   

  {/* Tabs Section */}
  <div className="flex space-x-4 border-b-[2px]">
    <button className="font-semibold">All</button>
    <button className="font-medium text-gray-500">Active</button>
    <button className="font-medium text-gray-500">Inactive</button>
  </div>
    <div className="w-full overflow-x-auto px-1">
    <table className="table-auto w-full bg-white shadow-md rounded-lg font-inter">
  <thead>
    <tr className="bg-[#2b4dc974] text-[12px] text-white text-center h-14">
      <th className="relative p-1 md:p-3">
        <input type="checkbox" className="w-4 h-4" />
      </th>
      <th className="relative p-1 md:p-3">Sl<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
      <th className="relative p-1 md:p-3">Name<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
      <th className="relative p-1 md:p-3">Parent Category<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
      <th className="relative p-1 md:p-3">Number of Providers<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
      <th className="relative p-1 md:p-3">Is Featured<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
      <th className="p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category, index) => (
      <tr
        key={category.id}
        className="border-b text-sm text-center text-gray-600 h-12"
      >
        <td className="p-2">
          <input type="checkbox" className="w-4 h-4" />
        </td>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{category.name}</td>
        <td className="p-2">{category.ParentCategory}</td>
        <td className="p-2">{category.NumberOfProvider}</td>
        <td className="p-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={category.isFeatured}
              onChange={() => toggleFeatured(index)}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </td>
        <td className="relative p-2">
          <button
            className="hover:bg-gray-100 cursor-pointer p-1 rounded-full"
            onClick={() => toggleDropdown(index)}
            aria-label="Actions"
          >
            <FiMoreVertical />
          </button>
          {dropdownOpen === index && (
            <div className="absolute right-0 top-8 bg-white border shadow-md z-10 w-36">
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
    </>
  );
};

export default SubCategorySetup;
