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
  updateProviderStatus,
} from '../features/providerSlice';
import notificationImg from '../Assets/notificationImg.png';

// Modal Component for editing provider
const EditProviderModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Provider</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="border mb-2 p-2 w-full"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="border mb-2 p-2 w-full"
            required
          />
          {/* If you need to display other fields as read-only, you can include them here */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0085FF] text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProviderList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    // Additional fields to keep the original data
    area_of_operation: '',
    profession: '',
  });

  const [filterType, setFilterType] = useState('all');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const providersState = useSelector((state) => state.providers);
  const { providers = [], loading = false, error = null, updateStatus, updateError } = providersState || {};

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    if (updateStatus === 'succeeded') {
      toast.success('Provider status updated successfully');
      dispatch(fetchProviders());
    }
    if (updateStatus === 'failed') {
      toast.error(`Failed to update status: ${updateError}`);
    }
  }, [updateStatus, updateError, dispatch]);

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setFormData({
      first_name: provider.first_name || '',
      last_name: provider.last_name || '',
      // Ensure other fields are retained and not cleared
      area_of_operation: provider.area_of_operation || '',
      profession: provider.profession || '',
    });
    setEditMode(true);
  };

  const handleSubmit = () => {
    const updatedData = {
      ...selectedProvider,
      first_name: formData.first_name,
      last_name: formData.last_name,
      // Keep other fields unchanged
      area_of_operation: formData.area_of_operation,
      profession: formData.profession,
    };

    dispatch(updateProvider({ id: selectedProvider.id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Provider updated successfully');
        dispatch(fetchProviders());
      })
      .catch((err) => {
        toast.error(`Update failed: ${err.message || err}`);
      });

    setEditMode(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      area_of_operation: '',
      profession: '',
    });
  };

  const getFilteredProviders = () => {
    if (filterType === 'active') {
      return providers.filter((provider) => provider.professional_status === 'active');
    }
    if (filterType === 'inactive') {
      return providers.filter((provider) => provider.professional_status !== 'active');
    }
    return providers;
  };

  const handleStatusChange = (providerId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    dispatch(updateProviderStatus({ providerId, newStatus }))
      .unwrap()
      .then(() => {
        dispatch(fetchProviders());
      })
      .catch((err) => {
        toast.error(`Failed to change status: ${err.message || err}`);
      });
  };

  if (loading && providers.length === 0) return <p>Loading...</p>;

  if (error) {
    toast.error(`Error: ${error.message || error}`);
    return null;
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
        {['all', 'active', 'inactive'].map((type) => (
          <button
            key={type}
            className={`font-semibold text-md transition-colors ${
              filterType === type ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
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
              <tr
                key={provider.id}
                className="border-b text-xs text-center hover:bg-gray-50 transition-colors"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={notificationImg}
                      alt={`${provider.first_name} ${provider.last_name}`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {`${provider.first_name} ${provider.last_name}`}
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
                <td className="p-2">
                  {/* Assuming 'profession' is an object with a 'title' property */}
                  {provider.profession && typeof provider.profession === 'object'
                    ? provider.profession.title
                    : provider.profession || 'N/A'}
                </td>
                <td className="p-2">{provider.views_count || 0}</td>
                <td className="p-2">{provider.provider_reviews_count || 'N/A'}</td>
                <td className="p-2">{provider.call_logs_count || 'N/A'}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={provider.availability === 'active'}
                    readOnly
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    id={`status-${provider.id}`}
                    checked={provider.professional_status === 'active'}
                    onChange={() =>
                      handleStatusChange(provider.id, provider.professional_status)
                    }
                    className="mr-2 cursor-pointer"
                  />
                </td>
                <td className="p-2 relative">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === provider.id ? null : provider.id)
                    }
                  >
                    <FiMoreVertical />
                  </button>
                  {dropdownOpen === provider.id && (
                    <div className="absolute right-0 bg-white shadow-md rounded mt-1 z-10">
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

      <ToastContainer />

      {/* Modal for editing provider */}
      <EditProviderModal
        isOpen={editMode}
        onClose={() => {
          setEditMode(false);
          resetForm(); // Reset form when modal closes
        }}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ProviderList;
