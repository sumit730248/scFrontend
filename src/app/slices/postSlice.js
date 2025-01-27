import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient, apiMultipartClient } from "../api/axiosInstance";
import { BASE_URL } from "@/constants/BASE_URL";

export const getPosts = createAsyncThunk(
  "getPosts",
  async ({ userId, page, limit }) => {
    try {
      const url = new URL(`${BASE_URL}/posts/`);

      if (userId) url.searchParams.set("userId", userId);
      if (page) url.searchParams.set("page", page);
      if (limit) url.searchParams.set("limit", limit);
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw new Error(error?.message || error);
    }
  },
);
export const addPosts = createAsyncThunk("addPosts", async (data) => {
  try {
    await apiMultipartClient.post(`/posts/`, data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
export const toggleLike = createAsyncThunk("toggleLike", async ({ postId }) => {
  try {
    if (!postId) {
      throw new Error("post id is required");
    }
    await apiClient.post("/likes/toggle/p/" + postId);
  } catch (err) {
    throw new Error(err);
  }
});
const initialState = {
  posts: [],
  page: 1,
  hasMore: true,
  error: false,
  postCount: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPostsState: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.postCount = 0;
      state.error = false;
    },
    incrementPage: (state) => {
      state.page+=1;
    },
    resetPage: (state) => {
      state.page=1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      const newPosts = action.payload.posts;
      state.posts.push(...newPosts);
      state.postCount = action.payload.totalPosts;
      state.hasMore = state.posts.length < state.postCount;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.error = true;
    });
  },
});

export default postSlice.reducer;
export const { clearPostsState, incrementPage, resetPage } = postSlice.actions;
export const selectPosts = (state) => state.post.posts;
export const selectPage = (state) => state.post.page;
export const seleteHasMore = (state) => state.post.hasMore;
export const selectError = (state) => state.post.error;
