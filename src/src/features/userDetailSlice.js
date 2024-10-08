import { createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: !!localStorage.getItem('authToken'), 
      token: localStorage.getItem('authToken') || null,
    },
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        localStorage.setItem('authToken', action.payload); 
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem('authToken'); 
      },
    },
  });

  export const { login, logout } = authSlice.actions;