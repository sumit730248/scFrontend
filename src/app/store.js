import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import jobReducer from "./slices/jobSlice"
import postReducer from "./slices/postSlice"
import profileReducer from "./slices/profileSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    post: postReducer,
    profile: profileReducer,
  }
});
