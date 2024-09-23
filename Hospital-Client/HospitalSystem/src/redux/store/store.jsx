import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "../slices/recordSlice";
import adminReducer from "../slices/adminSlices/adminSlice";
import authReducer from "../slices/authSlice/authSlice";
import userReducer from "../slices/userSlices/userSlice";
const store = configureStore({
  reducer: {
    admin: adminReducer,
    records: recordReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
