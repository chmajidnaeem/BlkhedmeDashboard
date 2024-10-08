import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL and Token
const PUSH_NOTIFICATION_URL = 'https://apiv2.blkhedme.com/api/admin/push/notification';
const ALL_USERS_URL = 'https://apiv2.blkhedme.com/api/admin/all/users';
const API_TOKEN = `${localStorage.getItem('authToken')}`; 

// Async action to push notification
export const pushNotification = createAsyncThunk(
  'notifications/pushNotification',
  async (notificationData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', notificationData.title);
      formData.append('description', notificationData.description);
      formData.append('resource_type', notificationData.resourceType);
      formData.append('city', notificationData.city);
      formData.append('image', notificationData.image);

      // array of user_ids to send notification to.
      notificationData.userIds.forEach((id, index) => {
        formData.append(`user_id[${index}]`, id);
      });

      const response = await axios.post(PUSH_NOTIFICATION_URL, formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: 'application/json',
        },
      });
      console.log("users Ids: ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to fetch(Read) all users
export const fetchAllUsers = createAsyncThunk(
  'notifications/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ALL_USERS_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: 'application/json',
        },
      });
      console.log("fetching users: ", response.data);
      return response.data.data;  // Return the array of users
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  users: [],
  notificationStatus: 'idle', // idle | loading | succeeded | failed
  usersStatus: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Notification slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pushNotification states
    builder
      .addCase(pushNotification.pending, (state) => {
        state.notificationStatus = 'loading';
      })
      .addCase(pushNotification.fulfilled, (state, action) => {
        state.notificationStatus = 'succeeded';
      })
      .addCase(pushNotification.rejected, (state, action) => {
        state.notificationStatus = 'failed';
        state.error = action.payload;
      });

    // Handle fetchAllUsers states
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersStatus = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersStatus = 'succeeded';
        state.users = action.payload;  
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
