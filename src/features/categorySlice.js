import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://apiv2.blkhedme.com/api/admin/categories';

// Fetching all categories
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("Fetched Category: ",response.data.category)
    return response.data.category; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; 
  }
});

// Adding  new category
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (newCategory, { rejectWithValue }) => { // Added rejectWithValue for better error handling
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('Token not found. Please login.');
      return rejectWithValue('Authentication token missing');
    }

    try {
      const response = await axios.post('https://apiv2.blkhedme.com/api/admin/categories', newCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Ensure correct Content-Type
        },
      });
      return response.data.category; 
    } catch (error) {
      console.error('Error adding category:', error.response ? error.response.data : error.message);
      // Provide more detailed error information
      return rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);
// toggle category
export const toggleCategoryStatus = createAsyncThunk('categories/toggleCategoryStatus', async (id) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.put(`https://apiv2.blkhedme.com/api/admin/category/status/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Status Update API Response:", response.data);
    return response.data.category; // aAPI returns the updated category objectss
  } catch (error) {
    console.error('Error updating category status:', error);
    throw error;
  }
});

// Updating an existing category
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, updatedData }) => {
  const token = localStorage.getItem('authToken');
  console.log("ID>> :",id)
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response after update:", response.data);
    return response.data.category; 
    
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; 
  }
});

// Delete a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  const token = localStorage.getItem('authToken');
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return id; 
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; 
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Adding category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload); 
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload; 
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Deleting category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload); // Remove deleted category
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
