import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories, deleteSubCategory, editSubCategory, toggleFeatured } from "../features/subCategorySlice";

const SubCategorySetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  
  // Access the subcategories state
  const subCategoriesState = useSelector((state) => state.subCategories);
  const { subCategories, loading, error } = subCategoriesState;

  // Fetch subcategories when the component mounts
  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubCategory(id));
    }
  };

  const handleSaveEdit = () => {
    dispatch(editSubCategory({ id: editingCategory, data: { name: editName } }));
    setEditingCategory(null);
    setEditName("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-2 font-poppins">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Sub Category Setup</h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/add-new-sub-category")}
          >
            Add New
          </button>
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
              {subCategories.map((category, index) => (
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
                        onChange={() => dispatch(toggleFeatured(category.id))}
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
                          <li 
                            className="hover:bg-gray-100 cursor-pointer p-2"
                            onClick={() => handleEditClick(category)}
                          >
                            Edit
                          </li>
                          <li 
                            className="hover:bg-gray-100 cursor-pointer p-2"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </li>
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

      {/* Modal for Editing Subcategory */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Subcategory</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-4"
              placeholder="Subcategory Name"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubCategorySetup;
