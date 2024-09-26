import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../authSlice'; // Ensure this path is correct
import seekerReducer from '../features/seekerSlice'; // Ensure this path is correct

// Configure store with auth and seeker reducers
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, // Ensure authSlice has the reducer correctly
        seekers: seekerReducer,
    },
});

export default store;
