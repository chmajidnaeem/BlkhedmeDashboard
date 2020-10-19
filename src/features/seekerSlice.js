import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://apiv2.blkhedme.com/api/admin/seeker';

// Function to get the authorization token
const getAuthToken = () => {
  return localStorage.getItem('authToken'); 
};

// Thunks for async actions
export const fetchSeekers = createAsyncThunk('seekers/fetchSeekers', async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, 
      },
    });
    console.log('Fetched Seekers:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching seekers:', error);
    throw error;
  }
});

// Add a new seeker
export const addSeeker = createAsyncThunk('seekers/addSeeker', async (newSeeker) => {
  try {
    const seekerToAdd = {
      profile_image: newSeeker.profile_image, // this will submit the image with field name profile_image to the server change as per your needs
      ratings: "0", // Default ratings
      calls: "0",   // Default call count
      reviews: "0", // Default review count
      date: Math.floor(Date.now() / 1000), // Current timestamp
    };

    if (newSeeker.first_name) seekerToAdd.first_name = newSeeker.first_name;
    if (newSeeker.last_name) seekerToAdd.last_name = newSeeker.last_name;
    if (newSeeker.phone) seekerToAdd.phone = newSeeker.phone;
    if (newSeeker.email) seekerToAdd.email = newSeeker.email;
    if (newSeeker.username) seekerToAdd.username = newSeeker.username; 
    if (newSeeker.password) seekerToAdd.password = newSeeker.password;
    console.log('seeker data submission:', seekerToAdd)
    const response = await axios.post(`${API_URL}/store`, seekerToAdd, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
       'Content-Type': 'multipart/form-data'
      },
    });
    
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(JSON.stringify(error.response.data.message));
    }
    console.error('Complete error object:', error);
    throw error;
  }
});

// Update an existing seeker
export const updateSeeker = createAsyncThunk('seekers/updateSeeker', async ({ id, updatedData }) => {
  try {
    console.log('Updating seeker with ID:', id);
    console.log('Updated data:', updatedData);

    const response = await axios.post(`${API_URL}/Update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add authorization header
      },
    });
    console.log('Updated seeker response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error updating seeker:', error.response?.data || error.message);
    throw error; // This will trigger the rejected case
  }
});

// Delete a seeker
export const deleteSeeker = createAsyncThunk('seekers/deleteSeeker', async (id) => {
  try {
    console.log('Deleting seeker with ID:', id);

    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, 
      },
    });
    console.log('Seeker deleted:', id);
    return id; // Returning id of the deleted seeker
  } catch (error) {
    console.error('Error deleting seeker:', error.response?.data || error.message);
    throw error; // will throw error if rejected
  }
});

const seekerSlice = createSlice({
  name: 'seekers',
  initialState: {
    seekers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch seekers
      .addCase(fetchSeekers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeekers.fulfilled, (state, action) => {
        state.loading = false;
        state.seekers = action.payload;
      })
      .addCase(fetchSeekers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
        console.error('Fetch Seekers Error:', state.error);
      })

      // Add seeker
      .addCase(addSeeker.fulfilled, (state, action) => {
        state.seekers.push(action.payload);
      })
      .addCase(addSeeker.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Add Seeker Error:', state.error);
      })

      // Update seeker
      .addCase(updateSeeker.fulfilled, (state, action) => {
        const index = state.seekers.findIndex((seeker) => seeker.id === action.payload.id);
        if (index !== -1) {
          state.seekers[index] = action.payload;
        }
      })
      .addCase(updateSeeker.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Update Seeker Error:', state.error);
      })

      // Delete seeker
      .addCase(deleteSeeker.fulfilled, (state, action) => {
        state.seekers = state.seekers.filter((seeker) => seeker.id !== action.payload);
      })
      .addCase(deleteSeeker.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('Delete Seeker Error:', state.error);
      });
  },
});

export default seekerSlice.reducer;
