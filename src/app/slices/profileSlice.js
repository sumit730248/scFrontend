import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../api/axiosInstance";
import { BASE_URL } from "@/constants/BASE_URL";

export const createProfile = createAsyncThunk("createProfile", async (data) => {
  try {
    await apiClient.post(`${BASE_URL}/profile/register`, data);
  } catch (err) {
    console.log(err);
  }
});

export const getProfile = createAsyncThunk("getProfile", async (userId) => {
  try {
    const response = await apiClient.get(`${BASE_URL}/profile/${userId}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
});

export const changeProfileDetails = createAsyncThunk(
  "changeProfileDetails",
  async (data) => {
    try {
      const response = await apiClient.patch(`${BASE_URL}/profile/update`, data);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const getSubscribers = createAsyncThunk(
  "getSubscribers",
  async (userId) => {
    try {
      if(!userId) throw new Error("userId required");
      const response = await apiClient.get(`/subscriptions/s/${userId}`);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const tonngleSubscription = createAsyncThunk(
  "tonngleSubscription",
  async (userId) => {
    try {
      if(!userId) throw new Error("userId required");
      const response = await apiClient.post(`/subscriptions/s/${userId}`);
      console.log(response)
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);
const initialState = {
  profileData: {},
  subscribers: 0,
  isSubscribed: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.profileData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profileData = action.payload;
    });
    builder.addCase(changeProfileDetails.fulfilled, (state, action) => {
      state.profileData = action.payload;
    });
    builder.addCase(getSubscribers.fulfilled, (state,action) => {
      state.subscribers = action.payload.subscribers;
      state.isSubscribed = action.payload.subscribeByUser;
    })
  },
});

export default profileSlice.reducer;
export const { clearProfileState } = profileSlice.actions;
export const selectProfile = (state) => state.profile.profileData;
export const selectIsSubscribed = (state) => state.profile.isSubscribed;
export const selectSubscribers = (state) => state.profile.subscribers;
