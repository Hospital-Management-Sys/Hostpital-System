import { configureStore } from '@reduxjs/toolkit';
import recordReducer from '../slices/recordSlice';

const store = configureStore({
  reducer: {
    records: recordReducer,
  },
});

export default store;
