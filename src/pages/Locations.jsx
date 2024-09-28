import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, deleteLocation, addLocation, updateLocation } from '../features/locationSlice';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid';

export default function LocationsList() {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locations);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ id: '', title: '', description: '' });

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteLocation(id));
  };

  const handleAddLocation = async (title, description, country_id) => {
    await dispatch(addLocation({ title, description, country_id }));
    setShowAddModal(false);
    dispatch(fetchLocations());
  };

  const handleEditLocation = async (id, title, description) => {
    await dispatch(updateLocation({ id, locationData: { title, description, country_id: 1 } }));
    setShowEditModal(false);
    dispatch(fetchLocations());
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Locations </h1>

      <button
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out mb-4"
        onClick={() => setShowAddModal(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2" /> Add New Location
      </button>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {locations.map((location) => (
            <li
              key={location.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{location.title}</h2>
                <p className="text-gray-600">{location.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentLocation(location);
                    setShowEditModal(true);
                  }}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <PencilIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleDelete(location.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAddModal && (
        <AddEditLocationModal
          onSave={handleAddLocation}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && (
        <AddEditLocationModal
          onSave={(title, description) => handleEditLocation(currentLocation.id, title, description)}
          onCancel={() => setShowEditModal(false)}
          initialData={currentLocation}
        />
      )}
    </div>
  );
}

// Modal Component for Adding/Editing
function AddEditLocationModal({ onSave, onCancel, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [country_id, setCountryId] = useState(initialData.country_id || '');

  const handleSubmit = () => {
    if (title && description) {
      onSave(title, description, country_id);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-out">
      <div className="bg-white p-6 rounded shadow-lg w-96 animate-fade-in">
        <h2 className="text-2xl mb-4 font-semibold">
          {initialData.id ? 'Edit Location' : 'Add Location'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Country ID</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={country_id}
            onChange={(e) => setCountryId(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300 ease-in-out"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
