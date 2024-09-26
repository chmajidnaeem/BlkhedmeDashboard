// src/features/subCategorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching subcategories from the API
export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async () => {
    const response = await fetch("https://66f592fb436827ced9746e96.mockapi.io/sub-category-setup");
    if (!response.ok) {
      throw new Error('Failed to fetch subcategories');
    }
    const data = await response.json();
    return data;
  }
);

// Async thunk for deleting a subcategory
export const deleteSubCategory = createAsyncThunk(
  'subCategories/deleteSubCategory',
  async (id) => {
    const response = await fetch(`https://66f592fb436827ced9746e96.mockapi.io/sub-category-setup/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete subcategory');
    }
    return id; // Return the ID of the deleted subcategory
  }
);

// Async thunk for editing a subcategory
export const editSubCategory = createAsyncThunk(
  'subCategories/editSubCategory',
  async ({ id, data }) => {
    const response = await fetch(`https://66f592fb436827ced9746e96.mockapi.io/sub-category-setup/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to edit subcategory');
    }
    const updatedData = await response.json();
    return updatedData; // Return the updated subcategory data
  }
);

// Async thunk for adding a new subcategory
export const addSubCategory = createAsyncThunk(
  'subCategories/addSubCategory',
  async (data) => {
    const response = await fetch("https://66f592fb436827ced9746e96.mockapi.io/sub-category-setup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to add subcategory');
    }
    const newData = await response.json();
    return newData; // Return the newly created subcategory
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
    toggleFeatured: (state, action) => {
      const categoryIndex = state.subCategories.findIndex(cat => cat.id === action.payload);
      if (categoryIndex !== -1) {
        state.subCategories[categoryIndex].isFeatured = !state.subCategories[categoryIndex].isFeatured;
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
        // Remove the deleted subcategory from the state
        state.subCategories = state.subCategories.filter(cat => cat.id !== action.payload);
      })
      .addCase(editSubCategory.fulfilled, (state, action) => {
        // Update the edited subcategory in the state
        const index = state.subCategories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.subCategories[index] = action.payload;
        }
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        // Add the newly created subcategory to the state
        state.subCategories.push(action.payload);
      });
  },
});

// Export the actions
export const { toggleFeatured } = subCategorySlice.actions;

// Export the reducer
export default subCategorySlice.reducer;
