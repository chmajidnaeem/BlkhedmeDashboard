import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://apiv2.blkhedme.com/api/admin/seeker';

// Function to get the authorization token
const getAuthToken = () => {
  // Replace this with your method of retrieving the token
  return localStorage.getItem('authToken'); // Assuming you store it in local storage
};

// Thunks for async actions
export const fetchSeekers = createAsyncThunk('seekers/fetchSeekers', async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add authorization header
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
    const response = await axios.put(`${API_URL}/`, newSeeker, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add authorization header
      },
    });
    return response.data; // Return the response data (newly added seeker)
  } catch (error) {
    console.error('Error adding seeker:', error);
    throw error; // This will trigger the rejected case
  }
});

// Update an existing seeker
export const updateSeeker = createAsyncThunk('seekers/updateSeeker', async ({ id, updatedData }) => {
  try {
    const response = await axios.put(`${API_URL}/store/Update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add authorization header
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating seeker:', error);
    throw error; // This will trigger the rejected case
  }
});

// Delete a seeker
export const deleteSeeker = createAsyncThunk('seekers/deleteSeeker', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add authorization header
      },
    });
    return id; // Return the id of the deleted seeker
  } catch (error) {
    console.error('Error deleting seeker:', error);
    throw error; // This will trigger the rejected case
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
        state.error = action.error.message; // Capture error message
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
