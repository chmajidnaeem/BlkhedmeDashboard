// src/features/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const API_URL = 'https://66f578e14ff096dbc75489d7.mockapi.io/subcategory-setup';

// Thunks for async actions

// Fetch all categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return categories data
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Handle error
  }
});

// Add a new category
export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
  try {
    const response = await axios.post(API_URL, newCategory);
    return response.data; // Return newly added category
  } catch (error) {
    console.error('Error adding category:', error);
    throw error; // Handle error
  }
});

// Update an existing category
export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, updatedData }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData); // Fixed template string syntax
    return response.data; // Return updated category
  } catch (error) {
    console.error('Error updating category:', error);
    throw error; // Handle error
  }
});

// Delete a category
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); // Fixed template string syntax
    return id; // Return deleted category's id
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; // Handle error
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
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Populate categories
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload); // Add new category to state
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload; // Update category in state
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload); // Remove deleted category
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
