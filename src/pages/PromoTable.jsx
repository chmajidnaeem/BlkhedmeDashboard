import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, updateBanner,fetchBanners } from "../features/promotionalBannerSlice";
import { fetchCategories } from "../features/categorySlice";

const PromoTable = ({ banners = [] }) => {
  const dispatch = useDispatch();
  const [selectedBannerId, setSelectedBannerId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBannerData, setEditBannerData] = useState({
    id: null,
    title: '',
    category_id: '',
    resource_type: '',
  });
  const { categories, categoryError } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log(banners);
    
  }, [dispatch]);

  const handleThreeDotsClick = (bannerId) => {
    setSelectedBannerId(selectedBannerId === bannerId ? null : bannerId);
  };

  const handleDelete = (bannerId) => {
    dispatch(deleteBanner({ id: bannerId }));
    setSelectedBannerId(null);
  };

  const handleEdit = (banner) => {
    setIsEditing(true);
    setEditBannerData({
      id: banner.id,
      title: banner.title,
      category_id: banner.category_id || '',
      resource_type: banner.resource_type || '',
    });
    setSelectedBannerId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Create the updated banner object
    const updatedBanner = {
      id: editBannerData.id,
      title: editBannerData.title,
      category_id: parseInt(editBannerData.category_id, ), // Ensure category_id is an integer
      resource_type: editBannerData.resource_type,
    };

    // Validation: Ensure no field is empty
    const validationErrors = [];
    if (!updatedBanner.title.trim()) {
      validationErrors.push("Title is required.");
    }
    if (!updatedBanner.category_id || isNaN(updatedBanner.category_id)) {
      validationErrors.push("Category ID must be a valid integer.");
    }
    if (!updatedBanner.resource_type.trim()) {
      validationErrors.push("Resource type is required.");
    }

    if (validationErrors.length > 0) {
      alert("Please fix the following errors:\n" + validationErrors.join("\n"));
      return;
    }

    // Dispatch the updateBanner action
    dispatch(updateBanner({ id: editBannerData.id, bannerData: updatedBanner }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        setEditBannerData({ id: null, title: '', category_id: '', resource_type: '' });

        // Fetch the updated banners list
        dispatch(fetchBanners());
      })
      .catch((error) => {
        console.error("Update banner error:", error);
        alert(JSON.stringify(error.message) || "Failed to update banner.");
      });
  };



  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border ">
          <thead>
            <tr className="bg-[#2B4DC994] text-left text-sm font-thin text-white">
              <th className="p-0">
                <span className="block py-2 px-3 border-r border-gray-300">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                </span>
              </th>
              <th className="p-0">SL</th>
              <th className="p-0">Name</th>
              <th className="p-0">Category</th>
              <th className="p-0">Start Date</th>
              <th className="p-0">End Date</th>
              <th className="p-0">No. of Views</th>
              <th className="p-0">No. of Clicks</th>
              <th className="p-0">Revenue</th>
              <th className="p-0">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <tr key={banner.id} className="border-b text-sm text-gray-800">
                  <td className="p-4">
                    <input type="checkbox" className="h-4 w-4 rounded" />
                  </td>
                  <td className="p-4">{`0${index + 1}`}</td>
                  <td className="p-4">{banner.title}</td>
                  <td className="p-4">{banner.category || "N/A"}</td>
                  <td className="p-4">{banner.created_at || "N/A"}</td>
                  <td className="p-4">{banner.endDate || "N/A"}</td>
                  <td className="p-4">{banner.views || "0"}</td>
                  <td className="p-4">{banner.clicks || "0"}</td>
                  <td className="p-4">{banner.revenue || "N/A"}</td>
                  <td className="p-4">
                    <label className="relative inline-block">
                      <input type="checkbox" className="peer invisible" checked={banner.status} readOnly />
                      <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-100 peer-checked:bg-sky-700"></span>
                      <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4"></span>
                    </label>
                  </td>
                  <td className="p-4 relative">
                    <BsThreeDots
                      className="h-6 w-6 text-[#707070] cursor-pointer"
                      onClick={() => handleThreeDotsClick(banner.id)}
                    />
                    {selectedBannerId === banner.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                        <button
                          className="block px-4 py-2 hover:bg-gray-200 text-sm"
                          onClick={() => handleEdit(banner)}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 hover:bg-gray-200 text-sm"
                          onClick={() => handleDelete(banner.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Edit Banner</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Title</label>
                <input
                  type="text"
                  value={editBannerData.title}
                  onChange={(e) => setEditBannerData({ ...editBannerData, title: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Category</label>
                <select
                  value={editBannerData.category_id}
                  onChange={(e) => setEditBannerData({ ...editBannerData, category_id: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories...</option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Resource Type</label>
                <input
                  type="text"
                  value={editBannerData.resource_type}
                  onChange={(e) => setEditBannerData({ ...editBannerData, resource_type: e.target.value })}
                  className="border border-gray-300 p-2 w-full rounded-lg"
                  placeholder="Enter resource type"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoTable;
