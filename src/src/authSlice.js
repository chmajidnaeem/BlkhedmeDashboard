import { createSlice } from '@reduxjs/toolkit';

// Helper function to fetch the token from localStorage
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  return token ? token : null;
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!getTokenFromLocalStorage(), // Check token presence to set authentication
    user: null,
    token: getTokenFromLocalStorage(), // Store token in state
  },
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // Expecting user object
      state.token = action.payload.token; // Expecting token in payload
      localStorage.setItem('token', action.payload.token); // Store token in localStorage
    },
    
    // Action to handle logout
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage on logout
    },

    // Optionally, add an action to handle token expiration or failure
    tokenExpired: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear the token on expiration
    },
  },
});

export const { loginSuccess, logoutSuccess, tokenExpired } = authSlice.actions;
export default authSlice.reducer;
