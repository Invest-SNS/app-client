import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAFeed as reqFetchAFeed,
  fetchMyFeed as reqFetchMyFeed,
  fetchAllFeed as reqFetchcAllFeed,
  postBoardFeed as reqPostBoardFeed,
  postVoteFeed as reqPostVoteFeed,
} from "~/lib/apis/feed";

const initialState = {
  myFeed: [],
  allFeed: [],
  aFeed: null,
  loading: "idle",
};

const fetchAFeed = createAsyncThunk(
  "feed/fetchAFeed",
  async (feedId, thunkAPI) => {
    const response = await reqFetchAFeed(feedId);
    console.log("response", response);
    return response;
  }
);

const fetchMyFeed = createAsyncThunk(
  "feed/fetchMyFeed",
  async (userId, thunkAPI) => {
    const response = await reqFetchMyFeed(userId);
    console.log("response", response);
    return response;
  }
);

const fetchAllFeed = createAsyncThunk(
  "feed/fetchAllFeed",
  async (data, thunkAPI) => {
    const response = await reqFetchcAllFeed();
    console.log("response", response);
    return response;
  }
);

const postBoardFeed = createAsyncThunk(
  "feed/postBoardFeed",
  async (formdata, thunkAPI) => {
    const response = await reqPostBoardFeed(formdata);
    return response;
  }
);

const postVoteFeed = createAsyncThunk(
  "feed/postVoteFeed",
  async (body, thunkAPI) => {
    const response = await reqPostVoteFeed(body);
    return response;
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.aFeed = action.payload;
      })
      .addCase(fetchAFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchMyFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.myFeed = action.payload;
      })
      .addCase(fetchMyFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchAllFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.allFeed = action.payload;
      })
      .addCase(fetchAllFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postBoardFeed.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postBoardFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postBoardFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postVoteFeed.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postVoteFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postVoteFeed.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export { fetchAFeed, fetchMyFeed, fetchAllFeed, postBoardFeed, postVoteFeed };
export default feedSlice.reducer;
