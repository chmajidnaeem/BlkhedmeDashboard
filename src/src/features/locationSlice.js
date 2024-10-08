import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// APIbase URL
const API_URL = 'https://apiv2.blkhedme.com/api/admin/locations';

const AUTH_TOKEN = `${localStorage.getItem('authToken')}`;

const getHeaders = () => ({
  Authorization: `Bearer ${AUTH_TOKEN}`,
  Accept: 'application/json',
});

// Fetch all locations (GET)
export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    console.log("Fetched Locations: ", response.data.locations);
    return response.data.locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return rejectWithValue(error.response ? error.response.data : "Server error");
  }
});

// Add a new location (POST)
export const addLocation = createAsyncThunk('locations/addLocation', async (locationData, { rejectWithValue }) => {
  try {
    // country_id is set a default or null if missing
    const newLocationData = {
      title: locationData.title,
      description: locationData.description || '',
    };

    const response = await axios.post(API_URL, newLocationData, {
      headers: getHeaders(),
    });
    console.log("Added Location: ", response.data);
    return response.data.location; 
  } catch (error) {
    console.error("Error adding location:", error);
    return rejectWithValue(error.response ? error.response.data : "Server error");
  }
});

// Update an existing location (PUT)
export const updateLocation = createAsyncThunk('locations/updateLocation', async ({ id, locationData }, { rejectWithValue }) => {
  try {
    const updatedLocationData = {
      title: locationData.title,
      description: locationData.description || '',
      country_id: locationData.country_id || null, // Default or null value for country_id
    };

    const response = await axios.put(`${API_URL}/${id}`, updatedLocationData, {
      headers: getHeaders(),
    });
    console.log("Updated Location: ", response.data);
    return response.data.location; 
  } catch (error) {
    console.error("Error updating location:", error);
    return rejectWithValue(error.response ? error.response.data : "Server error");
  }
});

// Delete a location (DELETE)
export const deleteLocation = createAsyncThunk('locations/deleteLocation', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getHeaders(),
    });
    console.log("Deleted Location ID: ", id);
    return id;
  } catch (error) {
    console.error("Error deleting location:", error);
    return rejectWithValue(error.response ? error.response.data : "Server error");
  }
});

const locationSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Locations
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Location
      .addCase(addLocation.fulfilled, (state, action) => {
        state.locations.push(action.payload);
      })
      .addCase(addLocation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Location
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.locations.findIndex((location) => location.id === action.payload.id);
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete Location
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.locations = state.locations.filter((location) => location.id !== action.payload);
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
