// src/redux/actions/authAction.js

// Define your action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Example action creator for login
export const login = (userData) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      // Simulate an API call
      const response = await fakeApiCall(userData); // Replace with your actual API call
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.user },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

// Fake API call function (for demonstration purposes)
const fakeApiCall = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'test' && data.password === 'password') {
        resolve({ user: { username: 'test' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};
