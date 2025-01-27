import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiMultipartClient } from "../api/axiosInstance";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formDataToSend) => {
    try {
      const response = await apiMultipartClient.post(
        "/users/register",
        formDataToSend,
      );
      return response.data;
    } catch (error) {
      throw error?.message || error;
    }
  },
);
export const loginUser = createAsyncThunk("loginUser", async (data) => {
  try {
    const response = await apiClient.post("/users/login", data);
    return response.data;
  } catch (error) {
    throw error?.message || error;
  }
});
export const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    const response = await apiClient.post("/users/logout");
    return response.data;
  } catch (error) {
    throw error?.message || error;
  }
});
export const updateAccountDetails = createAsyncThunk(
  "updateAccountDetails",
  async ({ fullName, email }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      const response = await apiClient.patch(
        "/users/update-Account-Details",
        formData,
      );
      return response.data;
    } catch (error) {
      throw error?.message || error;
    }
  },
);
export const getCurrentUser = createAsyncThunk("currentUser", async () => {
  try {
    const response = await apiClient.get("/users/current-user");
    return response.data;
  } catch (error) {
    throw error.message;
  }
});
export const passwordChange = createAsyncThunk(
  "passwordChange",
  async ({ oldPassword, newPassword }) => {
    try {
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      const response = await apiClient.post("/users/change-password", formData);
      return response.data;
    } catch (error) {
      throw error?.message || error;
    }
  },
);
export const RefreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async () => {
    try {
      await apiClient.post("/users/refresh-token", {});
    } catch (error) {
      throw error?.message || error;
    }
  },
);
export const avatarUpdate = createAsyncThunk(
  "avatarUpdate",
  async ({ avatar }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);
      const response = await apiMultipartClient.patch(
        "/users/update-Avatar",
        formData,
      );
      return response.data.data;
    } catch (error) {
      throw error?.message || error;
    }
  },
);
export const coverImageUpdate = createAsyncThunk(
  "CoverImageUpdate",
  async ({ coverImage }) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      const response = await apiMultipartClient.patch(
        "/users/update-CoverImage",
        formData,
      );
      return response.data.data;
    } catch (error) {
      throw new Error(error);
    }
  },
);
const initialState = {
  user: null,
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.status = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.status = false;
    });
    builder.addCase(updateAccountDetails.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addCase(avatarUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(coverImageUpdate.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.status = true;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.user = null;
      state.status = false;
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentStatus = (state) => state.auth.status;
