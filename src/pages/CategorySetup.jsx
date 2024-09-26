import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory, updateCategory } from "../features/categorySlice"; // Adjust path as needed

const CategoryTable = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access categories, loading, and error state from Redux
  const { categories, loading, error } = useSelector((state) => state.categories);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setCategoryName(category.name);
    setIsActive(category.isActive);
    setIsModalOpen(true);
    toggleDropdown(null); // Close dropdown
  };

  const handleUpdate = async () => {
    const updatedCategory = {
      id: currentCategory.id, // Ensure you're passing the id
      name: categoryName,
      isActive: isActive,
    };

    try {
      await dispatch(updateCategory(updatedCategory)).unwrap();
      setIsModalOpen(false);
      setCurrentCategory(null);
      // Optionally refresh categories after update
      dispatch(fetchCategories());
    } catch (error) {
      console.error('Failed to update category:', error);
      // You might want to show an error message here
    }
  };

  return (
    <> 
      <div className="space-y-2 font-poppins">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category Setup</h1>
          <button className="bg-blue-500 text-white px-3 md:px-6 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/add-new-category")}>
            Add New
          </button>
        </div>

        <div className="flex space-x-4 border-b-[2px]">
          <button className="font-semibold">All</button>
          <button className="font-medium text-gray-500">Active</button>
          <button className="font-medium text-gray-500">Inactive</button>
        </div>
        
        <div className="w-full overflow-x-auto px-1">
          {loading ? (
            <p className="text-center">Loading categories...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="table-auto w-full bg-white shadow-md rounded-lg font-inter">
              <thead>
                <tr className="bg-[#2b4dc974] text-[10px] md:text-[12px] h-14 text-white text-center">
                  <th className="relative p-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span>
                  </th>
                  <th className="relative p-1 md:p-3">Sl<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="relative p-1 md:p-3">Category Name<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="relative p-1 md:p-3">Sub Category Count<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="relative p-1 md:p-3">Number of Provider<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="relative p-1 md:p-3">Status<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="relative p-1 md:p-3">Is Featured<span className="absolute top-0 bottom-0 right-0 h-[75%] w-[1px] bg-white m-auto"></span></th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id} className="border-b text-sm text-center text-gray-600 h-12">
                    <td className="p-2">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{category.name}</td>
                    <td className="p-2">{category.subCategoryCount}</td>
                    <td className="p-2">{category.providerCount}</td>
                    <td className="p-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={category.isActive} className="sr-only peer" readOnly />
                        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </label>
                    </td>
                    <td className="p-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={category.isFeatured} className="sr-only peer" readOnly />
                        <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                    <td className="relative p-2">
                      <button className="hover:bg-gray-100 cursor-pointer p-1 rounded-full" onClick={() => toggleDropdown(index)}>
                        <FiMoreVertical />
                      </button>
                      {dropdownOpen === index && (
                        <div className="absolute right-0 top-8 bg-white border shadow-md z-10 w-36">
                          <ul>
                            <li className="hover:bg-gray-100 cursor-pointer p-2" onClick={() => handleEditClick(category)}>Edit</li>
                            <li className="hover:bg-gray-100 cursor-pointer p-2" onClick={() => handleDelete(category.id)}>Delete</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Editing Category */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <div className="mb-4">
              <label className="block mb-2">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                  className="mr-2"
                />
                Active
              </label>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => setIsModalOpen(false)}
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

export default CategoryTable;
