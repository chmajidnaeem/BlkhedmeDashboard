import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLocations } from '../api/locationAPI'; 

export const fetchLocationsAsync = createAsyncThunk('locations/fetchLocations', async () => {
  const data = await fetchLocations();
  return data;
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
      .addCase(fetchLocationsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLocationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default locationSlice.reducer;
