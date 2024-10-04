// // store.js (or your Redux slice)
import { createSlice, configureStore } from '@reduxjs/toolkit';
import seekerReducer from './features/seekerSlice'
import providerSlice from "./features/providerSlice";
import categoryReducer from './features/categorySlice';
// // Authentication slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: !!localStorage.getItem('authToken'), // Check if token exists on load
//     token: localStorage.getItem('authToken') || null, // Set token from localStorage
//   },
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.token = action.payload.token;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//       localStorage.removeItem('authToken'); // Clear token on logout
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//   },
// });

// export default store;
// store.js (or your Redux slice)
import subCategoryReducer from "./features/subCategorySlice"
import notificationReducer from './features/notificationSlice';
import locationReducer from "./features/locationSlice"
import promotionalBannerReducer from './features/promotionalBannerSlice';
import providerViewReducer from './features/providerViewSlice';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('authToken'), // Initialize based on token
    token: localStorage.getItem('authToken') || null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload); // Save token in localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authToken'); // Remove token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    seekers: seekerReducer,
    providers: providerSlice, 
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    notifications: notificationReducer,
    locations: locationReducer,
    promotionalBanners: promotionalBannerReducer,
    provider: providerViewReducer,
  },
});
export default store;
