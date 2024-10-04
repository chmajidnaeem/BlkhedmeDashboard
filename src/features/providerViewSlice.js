// Import necessary functions from Redux Toolkit and Axios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching provider data from the API
export const fetchProvider = createAsyncThunk(
  'provider/fetchProvider',
  async (providerId, { rejectWithValue }) => {
    try {
      // Get authToken from local storage
      const authToken = localStorage.getItem('authToken');
      
      // Make API request with authToken in headers
      const response = await axios.get(`https://apiv2.blkhedme.com/api/admin/provider/${providerId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Provider View: ", response.data)
      return response.data.data;
    } catch (error) {
      // Handle and return any error encountered during the request
      return rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

// Create the slice
const providerViewSlice = createSlice({
  name: 'provider',
  initialState: {
    providerData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.providerData = action.payload;
      })
      .addCase(fetchProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to include in the store
export default providerViewSlice.reducer;
