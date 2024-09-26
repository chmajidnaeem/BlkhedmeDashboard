// import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/authActionTypes';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authAction';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};