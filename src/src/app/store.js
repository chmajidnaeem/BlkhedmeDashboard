import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../authSlice'; 
import seekerReducer from '../features/seekerSlice'; //importing from SeekerSlice inside features/seekerSlice
import providerSlice from "../features/providerSlice"; //importing from providerSlice inside features/providerSlice

// configuring store with desired features
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer, 
        seekers: seekerReducer,
        providers: providerSlice, 
    },
});

export default store;
