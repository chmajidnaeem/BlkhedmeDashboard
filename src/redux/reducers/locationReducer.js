import { FETCH_LOCATIONS, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE } from '../types';

const initialState = {
  locations: [],
  loading: false,
  error: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return { ...state, loading: true };
    case FETCH_LOCATIONS_SUCCESS:
      return { ...state, loading: false, locations: action.payload };
    case FETCH_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default locationReducer;
