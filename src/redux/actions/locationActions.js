import { FETCH_LOCATIONS, FETCH_LOCATIONS_SUCCESS, FETCH_LOCATIONS_FAILURE } from '../types';
import { fetchLocations } from '../api/locationsApi';

export const fetchLocationsAction = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATIONS });
  try {
    const locations = await fetchLocations();
    dispatch({ type: FETCH_LOCATIONS_SUCCESS, payload: locations });
  } catch (error) {
    dispatch({ type: FETCH_LOCATIONS_FAILURE, payload: error.message });
  }
};
