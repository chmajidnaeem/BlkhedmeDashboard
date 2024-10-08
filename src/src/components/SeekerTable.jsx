import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { deleteSeeker, updateSeeker } from '../features/seekerSlice'; // Import your actions

const SeekerTable = ({ seekers }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [activePopup, setActivePopup] = useState(null);
  const [editingSeeker, setEditingSeeker] = useState(null); // State for the seeker being edited
  const [updatedData, setUpdatedData] = useState({}); // State for updated data

  // Toggle popup visibility
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  // Handle the edit button click
  const handleEdit = (seeker) => {
    setEditingSeeker(seeker);
    setUpdatedData({ // Pre-fill the form with current seeker data
      first_name: seeker.first_name || "",
      last_name: seeker.last_name || "",
      phone: seeker.phone || "",
    });
  };

  // Handle form submission for updating seeker
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a new object with only the fields that are changed or required
    const { id } = editingSeeker;
    const payload = { id, updatedData: {} };

    // Populate updatedData with only changed fields
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key]) {
        payload.updatedData[key] = updatedData[key];
      }
    });

    dispatch(updateSeeker(payload)); // Dispatch update action
    setEditingSeeker(null); // Close edit mode
  };

  // Handle input change for updating data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value }); // Update the specific field
  };

  // Handle toggle change
  const handleToggleChange = (seeker) => {
    const updatedStatus = seeker.status === "active" ? "inactive" : "active"; // Toggle the status
    // Prepare updated data with existing values for required fields
    const payload = {
      id: seeker.id,
      updatedData: {
        status: updatedStatus,
        first_name: seeker.first_name,
        last_name: seeker.last_name,
        phone: seeker.phone,
      },
    };
    dispatch(updateSeeker(payload)); // Dispatch the action to update status
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
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">ID</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Seeker</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Contact</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Number of Calls</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Number of Reviews</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Joining Date</span></th>
              <th className="p-0 "><span className="block py-2 px-3 border-r border-gray-300">Status</span></th>
              <th className="p-0"><span className="block py-2 px-3">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {seekers.map((seeker, index) => (
              <tr key={seeker.id} className="border-b text-xs text-center px-2 text-gray-800">
                <td className="p-4"><input type="checkbox" className="h-4 w-4 rounded" /></td>
                <td className="p-4">{`0${index + 1}`}</td>
                <td className="p-4">
                  <div className="flex items-center">
                    <img src={seeker.image} alt="Provider" className="w-8 h-8 rounded-full" />&nbsp;&nbsp;
                    <span>{`${seeker.first_name} ${seeker.last_name}`}</span>
                  </div>
                </td>
                <td className="p-4">{seeker.phone || "N/A"} {seeker.email || "N/A"}</td>
                <td className="p-4">{seeker.user_call_logs_count || 0}</td>
                <td className="p-4">{seeker.provider_reviews || "N/A"}</td>
                <td className="p-4">{new Date(seeker.date).toLocaleDateString()}</td> {/* Format date */}
                <td className="p-4">
                  <label className="relative inline-block">
                    <input 
                      type="checkbox" 
                      className="peer invisible" 
                      checked={seeker.status === "active"} // Check based on seeker status
                      onChange={() => handleToggleChange(seeker)} // Handle toggle change
                    />
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
                      <h1 className="cursor-pointer text-xs md:text-sm" onClick={() => handleEdit(seeker)}>Edit</h1>
                      <h1 className="cursor-pointer mt-1 text-xs md:text-sm" onClick={() => dispatch(deleteSeeker(seeker.id))}>Delete</h1>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingSeeker && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Edit Seeker</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="first_name">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={updatedData.first_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="last_name">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={updatedData.last_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={updatedData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setEditingSeeker(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeekerTable;
