import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://apiv2.blkhedme.com/api/admin/provider';

// Fetching all providers
export const fetchProviders = createAsyncThunk('provider/fetchProviders', async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Fetched Providers: ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching providers:', error);
    throw error;
  }
});

// Adding new provider
export const addProvider = createAsyncThunk(
  'providers/addProvider',
  async (newProvider, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found. Please login.');
      return rejectWithValue('Authentication token missing');
    }

    try {
      const response = await axios.post(`${API_URL}/store`, newProvider, { 
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json', 
        },
      });

      console.log("Add Provider Response: ", response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error adding provider:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

// Updating an existing provider
export const updateProvider = createAsyncThunk('providers/updateProvider', async ({ id, updatedData }) => {
  console.log("ID : ", id);
  console.log("updatedData : ", updatedData);
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.post(`${API_URL}/update/${id}`, updatedData, { // Ensure this endpoint is correct
      headers: {
        'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json', 
      },
    });
    console.log("Updating Provider Response: ", response.data);
    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error('Error updating provider (response):', error.response);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('Error updating provider (request):', error.request);
    } else {
      console.error('Error updating provider (message):', error.message);
    }
    throw error; // Re-throw the error so it can be caught in the thunk
  }
});

// Async action to update provider status
export const updateProviderStatus = createAsyncThunk(
  'providers/updateProviderStatus',
  async ({ providerId, newStatus }, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken'); 
    try {
      const response = await axios.post(
        `${API_URL}/status`,
        {
          provider_id: providerId,
          professional_status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log('Status Update Response:', response.data);
      return { providerId, newStatus }; 
    } catch (error) {
      console.error('Error updating provider status:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

// Deleting a provider
export const deleteProvider = createAsyncThunk('providers/deleteProvider', async (id) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`${API_URL}/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    console.error('Error deleting provider:', error);
    throw error;
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
      // Fetching providers
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
      })

      // Adding provider
      .addCase(addProvider.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(addProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.providers.push(action.payload);
      })
      .addCase(addProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Updating provider
      .addCase(updateProvider.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProvider = action.payload;
        const index = state.providers.findIndex((provider) => provider.id === updatedProvider.id);
        if (index !== -1) {
          state.providers[index] = updatedProvider;
        }
      })
      .addCase(updateProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Updating provider status
      .addCase(updateProviderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProviderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { providerId, newStatus } = action.payload;
        const provider = state.providers.find((p) => p.id === providerId);
        if (provider) {
          provider.status = newStatus;
        }
      })
      .addCase(updateProviderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Deleting provider
      .addCase(deleteProvider.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProvider.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.providers = state.providers.filter((provider) => provider.id !== id);
      })
      .addCase(deleteProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default providerSlice.reducer;
