import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubCategory = createAsyncThunk('subCategory/fetchSubCategory', async (id) => {
    const response = await axios.get(`https://localhost:3000/subCategory/${id}`);
    return response.data; // This should return your subcategory data
});

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSubCategory: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Assuming payload is the subcategory object
            })
            .addCase(fetchSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSubCategory } = subCategorySlice.actions;

export default subCategorySlice.reducer;
