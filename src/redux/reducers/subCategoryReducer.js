import {
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    FETCH_SUBCATEGORIES_FAILURE,
  } from '../actions/subCategoryActions';
  
  const initialState = {
    loading: false,
    subCategories: [],
    error: '',
  };
  
  const subCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUBCATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_SUBCATEGORIES_SUCCESS:
        return {
          loading: false,
          subCategories: action.payload,
          error: '',
        };
      case FETCH_SUBCATEGORIES_FAILURE:
        return {
          loading: false,
          subCategories: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default subCategoryReducer;
  