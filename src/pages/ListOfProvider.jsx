import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    firstName: '', // separate fields for first name
    lastName: '', // and last name
    rating: '',
    contactNumber: '',
    category: '',
    views: 0,
    reports: 0,
    calls: 0,
    isAvailable: false,
    isActive: false,
  });

  const [filterType, setFilterType] = useState('all'); // State to track filter type

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const providersState = useSelector((state) => state.providers);
  const { providers = [], loading = false, error = null } = providersState || {};

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    // Populate form fields with the selected provider data
    setFormData({
      firstName: provider.firstName || '',
      lastName: provider.lastName || '',
      rating: provider.rating || 0,
      contactNumber: provider.contactNumber || '',
      category: provider.category || '',
      views: provider.views || 0,
      reports: provider.reports || 0,
      calls: provider.calls || 0,
      isAvailable: provider.isAvailable || false,
      isActive: provider.isActive || false,
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
      firstName: '',
      lastName: '',
      rating: '',
      contactNumber: '',
      category: '',
      views: 0,
      reports: 0,
      calls: 0,
      isAvailable: false,
      isActive: false,
    });
  };

  // Function to filter providers based on the selected filter
  const getFilteredProviders = () => {
    if (filterType === 'active') {
      return providers.filter((provider) => provider.isActive);
    }
    if (filterType === 'inactive') {
      return providers.filter((provider) => !provider.isActive);
    }
    return providers; // Default to all providers
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4 font-poppins">
      {/* Add New Provider Button */}
      <div className="flex justify-end pt-4 pr-4 w-full">
        <button
          className="bg-[#0085FF] text-white text-sm px-6 py-2 rounded-lg shadow-md hover:bg-[#0072cc] transition duration-200 ease-in-out"
          onClick={() => navigate('/add-new-provider')}
        >
          Add New
        </button>
      </div>

      {/* Providers Filter */}
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

      {/* Providers Table */}
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
                      alt={`${provider.firstName} ${provider.lastName}`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {`${provider.firstName} ${provider.lastName}`}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    {provider.rating}
                  </div>
                </td>
                <td className="p-2">
                  {provider.email}
                  <br />
                  {provider.contactNumber}
                </td>
                <td className="p-2">{provider.category}</td>
                <td className="p-2">{provider.views}</td>
                <td className="p-2">{provider.reports}</td>
                <td className="p-2">{provider.calls}</td>
                <td className="p-2">
                  <input type="checkbox" checked={provider.isAvailable} readOnly />
                </td>
                <td className="p-2">
                  <input type="checkbox" checked={provider.isActive} readOnly />
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
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Rating</label>
                <input
                  type="number"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Contact Number</label>
                <input
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProviderList;
