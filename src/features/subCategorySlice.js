import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "https://apiv2.blkhedme.com/api/admin/subcategories";

// Fetching all subcategories
export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched sub Categories: ", response.data.data)
      return response.data.data; 
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error; 
    }
  }
);

// Adding a new subcategory
export const addSubCategory = createAsyncThunk(
  'subCategories/addSubCategory',
  async (data, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('location_id', data.location_id);
    formData.append('name', data.name);
    formData.append('image', data.image);
    formData.append('description', data.description);
    formData.append('parent_id', data.parent_id);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data; 
    } catch (error) {
      console.error('Error adding subcategory:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

// Updating an existing subcategory
export const editSubCategory = createAsyncThunk(
  'subCategories/editSubCategory',
  async ({ id, data }, { rejectWithValue }) => {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();

    // Appending the required fields only if they are defined in the form
    formData.append('location_id', data.location_id || '');
    formData.append('name', data.name || '');
    formData.append('image', data.image || null); // the image as handled as optional
    formData.append('description', data.description || '');
    formData.append('parent_id', data.parent_id || 0); // Using 0 if parent_id is not defined

    // Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(`${API_URL}/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data', // Uncomment if necessary
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error editing subcategory:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data.message || error.message : 'Unknown error');
    }
  }
);


// Deleting a subcategory
export const deleteSubCategory = createAsyncThunk(
  'subCategories/deleteSubCategory',
  async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; 
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      throw error; 
    }
  }
);
// Create a slice
const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFeatured(state, action) {
      const subCategory = state.subCategories.find(cat => cat.id === action.payload.id);
      if (subCategory) {
        subCategory.isFeatured = !subCategory.isFeatured; 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter(cat => cat.id !== action.payload);
      })
      .addCase(editSubCategory.fulfilled, (state, action) => {
        const index = state.subCategories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      });
  },
});

// Export the actions
export const { toggleFeatured } = subCategorySlice.actions;

// Export the reducer
export default subCategorySlice.reducer;
