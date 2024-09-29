import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  fetchProviders,
  deleteProvider,
  updateProvider,
} from '../features/providerSlice';
import notificationImg from '../Assets/notificationImg.png';

const ProviderList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    rating: '',
    phone: '', // Updated to match the field in the API
    profession: '', // Updated to match the field in the API
    views_count: 0, // Updated to match the field in the API
    isAvailable: false,
    isActive: false,
  });

  const [filterType, setFilterType] = useState('all');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const providersState = useSelector((state) => state.providers);
  const { providers = [], loading = false, error = null } = providersState || {};

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setFormData({
      first_name: provider.first_name || '',
      last_name: provider.last_name || '',
      rating: provider.rating || 0,
      phone: provider.phone || '', // Use phone field
      profession: provider.profession || '', // Use profession field
      views_count: provider.views_count || 0,
      isAvailable: provider.availability || false,
      isActive: provider.status === 'active', // Use status field for active/inactive state
    });
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateProvider({ id: selectedProvider.id, updatedData: formData }));
    }
    setEditMode(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      rating: '',
      phone: '',
      profession: '',
      views_count: 0,
      isAvailable: false,
      isActive: false,
    });
  };

  const getFilteredProviders = () => {
    if (filterType === 'active') {
      return providers.filter((provider) => provider.status === 'active');
    }
    if (filterType === 'inactive') {
      return providers.filter((provider) => provider.status !== 'active');
    }
    return providers;
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    toast.error(`Error: ${error.message || error}`);
    return null;  // Prevent further rendering if there's an error
  }

  return (
    <div className="space-y-4 font-poppins">
      <div className="flex justify-end pt-4 pr-4 w-full">
        <button
          className="bg-[#0085FF] text-white text-sm px-6 py-2 rounded-lg shadow-md hover:bg-[#0072cc] transition duration-200 ease-in-out"
          onClick={() => navigate('/add-new-provider')}
        >
          Add New
        </button>
      </div>

      <div className="flex space-x-6 border-b pb-2">
        <button
          className={`font-semibold text-md transition-colors ${filterType === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setFilterType('all')}
        >
          All
        </button>
        <button
          className={`font-semibold text-md transition-colors ${filterType === 'active' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setFilterType('active')}
        >
          Active
        </button>
        <button
          className={`font-semibold text-md transition-colors ${filterType === 'inactive' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setFilterType('inactive')}
        >
          Inactive
        </button>
      </div>

      <div className="w-full overflow-x-auto px-1">
        <table className="bg-white shadow-md rounded-lg text-sm table-auto w-full">
          <thead>
            <tr className="text-center bg-[#2b4dc9] text-white text-xs h-14">
              <th className="p-3">SL</th>
              <th className="p-3">Provider</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Category</th> 
              <th className="p-3">Views</th>
              <th className="p-3">Reports</th>
              <th className="p-3">Calls</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredProviders().map((provider, index) => (
              <tr key={provider.id} className="border-b text-xs text-center hover:bg-gray-50 transition-colors">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={notificationImg}
                      alt={`${provider.first_name} ${provider.last_name}`} // Fixed template literal
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {`${provider.first_name} ${provider.last_name}`} {/* Fixed template literal */}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    {provider.rating || 0}
                  </div>
                </td>
                <td className="p-2">
                  {provider.email || 'N/A'}
                  <br />
                  {provider.phone || 'N/A'}
                </td>
                <td className="p-2">{provider.profession || 'N/A'}</td> {/* Profession field */}
                <td className="p-2">{provider.views_count || 0}</td>
                <td className="p-2">{provider.provider_reviews_count || "N/A"}</td> {/* Reports field change id didn't found reports feild coming from api so i paste the reviews field here */}
                <td className="p-2">{provider.call_logs_count
                  || "N/A"}</td>
                <td className="p-2">
                  <input type="checkbox" checked={provider.availability || false} readOnly />
                </td>
                <td className="p-2">
                  <input type="checkbox" checked={provider.status === 'active'} readOnly />
                </td>
                <td className="p-2 relative">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setDropdownOpen(index === dropdownOpen ? null : index)}
                  >
                    <FiMoreVertical />
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute right-0 bg-white shadow-md rounded mt-1">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleEdit(provider)}
                      >
                        Edit
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => dispatch(deleteProvider(provider.id))}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Provider Modal */}
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4">Edit Provider</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2 text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Profession</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Availability</label>
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Status</label>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-4 text-gray-600 hover:text-gray-800"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProviderList;
