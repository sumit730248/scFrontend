import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getJobs = createAsyncThunk("getJobs", async (pramsObj) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: pramsObj,
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_JSEARCH_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
const initialState = {
  jobs: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};
// Slice for job data
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.jobs = action.payload?.data || [];
        state.status = "succeeded";
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});
export default jobSlice.reducer;
export const selectJobs = (state) => state.job.jobs;
export const selectJobError = (state) => state.job.error;
export const selectJobStatus = (state) => state.job.status;
