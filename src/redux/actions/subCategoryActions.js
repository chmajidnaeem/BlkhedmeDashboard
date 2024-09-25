import axios from 'axios';

// Action Types
export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE';

// Action Creators
export const fetchSubCategoriesRequest = () => ({
  type: FETCH_SUBCATEGORIES_REQUEST,
});

export const fetchSubCategoriesSuccess = (subCategories) => ({
  type: FETCH_SUBCATEGORIES_SUCCESS,
  payload: subCategories,
});

export const fetchSubCategoriesFailure = (error) => ({
  type: FETCH_SUBCATEGORIES_FAILURE,
  payload: error,
});

// Thunk to fetch subcategories
export const fetchSubCategories = () => {
  return async (dispatch) => {
    dispatch(fetchSubCategoriesRequest());
    try {
      const response = await axios.get('https://apiv2.blkhedme.com/api/subCategory/1'); // Adjust the endpoint as needed
      dispatch(fetchSubCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(fetchSubCategoriesFailure(error.message));
    }
  };
};
