import { configureStore } from '@reduxjs/toolkit'; 
import { authReducer } from '../reducers/authReducer'; // existing auth reducer
import locationReducer from '../slices/locationSlice'; // location slice
import subCategoryReducer from '../slices/subcategorySlice'; 

const rootReducer = {
  auth: authReducer,
  locations: locationReducer,
  subCategory: subCategoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
