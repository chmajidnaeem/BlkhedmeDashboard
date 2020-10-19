import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://apiv2.blkhedme.com/api/admin/promotional/banner';

// Async thunk to fetch promotional banners
export const fetchBanners = createAsyncThunk('banners/fetchBanners', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    console.log('Fetched banners:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Fetch banners error:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to create a new banner (without image)
export const createBanner = createAsyncThunk(
    'banners/createBanner',
    async ({ bannerData }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('authToken');
        
        //i Remove this image field from bannerData if it's not supposed to be sent
        const { image, ...dataWithoutImage } = bannerData;
  
        // Send only the fields which are accepted by the server
        const response = await axios.post(`${API_URL}/store/Update`, bannerData, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json', 
          },
        });
  
        console.log('Created banner:', response.data);
        return response.data;
      } catch (error) {
        console.error('Create banner error:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  
// Async thunk to update an existing banner
export const updateBanner = createAsyncThunk('banners/updateBanner', async ({ id, bannerData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      
      console.log('Updating banner with data: ', bannerData);
      
      const response = await axios.post(`${API_URL}/store/Update/${id}`, bannerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json', 
        },
      });
      console.log('Updated banner:', response.data.data);
      return response.data;
    } catch (error) {
      console.error('Update banner error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  });
  

// Async thunk to delete a banner
export const deleteBanner = createAsyncThunk('banners/deleteBanner', async ({ id }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    console.log('Deleted banner ID:', id);
    return id; // returning banner ID
  } catch (error) {
    console.error('Delete banner error:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

// Slice
const promotionalBannerSlice = createSlice({
  name: 'promotionalBanners',
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload; 
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default promotionalBannerSlice.reducer;
