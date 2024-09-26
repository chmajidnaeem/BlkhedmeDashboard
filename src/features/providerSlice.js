
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://66f5205e9aa4891f2a23f35d.mockapi.io/list-of-provider';

// Thunks for async actions
export const fetchProviders = createAsyncThunk('providers/fetchProviders', async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched Providers:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching providers:', error); 
    throw error; // Rethrow the error to trigger the rejected case
  }
});

// Add a new provider
export const addProvider = createAsyncThunk('providers/addProvider', async (newProvider) => {
  try {
    const response = await axios.post("https://66f5205e9aa4891f2a23f35d.mockapi.io/list-of-provider", newProvider);
    return response.data; // Return the response data (newly added provider)
  } catch (error) {
    console.error('Error adding provider:', error);
    throw error; // This will trigger the rejected case
  }
});

// Update an existing provider
export const updateProvider = createAsyncThunk('providers/updateProvider', async ({ id, updatedData }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating provider:', error);
    throw error; // This will trigger the rejected case
  }
});

// Delete a provider
export const deleteProvider = createAsyncThunk('providers/deleteProvider', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id; // Return the id of the deleted provider
  } catch (error) {
    console.error('Error deleting provider:', error);
    throw error; // This will trigger the rejected case
  }
});

const providerSlice = createSlice({
  name: 'providers',
  initialState: {
    providers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch providers
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
        console.error('Fetch Providers Error:', state.error); 
      })

      // Add provider
      .addCase(addProvider.fulfilled, (state, action) => {
        state.providers.push(action.payload);
      })
      .addCase(addProvider.rejected, (state, action) => {
        state.error = action.error.message; 
        console.error('Add Provider Error:', state.error);
      })

      // Update provider
      .addCase(updateProvider.fulfilled, (state, action) => {
        const index = state.providers.findIndex((provider) => provider.id === action.payload.id);
        if (index !== -1) {
          state.providers[index] = action.payload;
        }
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.error = action.error.message; 
        console.error('Update Provider Error:', state.error); 
      })

      // Delete provider
      .addCase(deleteProvider.fulfilled, (state, action) => {
        state.providers = state.providers.filter((provider) => provider.id !== action.payload);
      })
      .addCase(deleteProvider.rejected, (state, action) => {
        state.error = action.error.message; 
        console.error('Delete Provider Error:', state.error); 
      });
  },
});

export default providerSlice.reducer;
