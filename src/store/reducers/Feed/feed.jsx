import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAFeed as reqFetchAFeed,
  fetchMyFeed as reqFetchMyFeed,
  fetchOtherFeed as reqFetchOtherFeed,
  fetchAllFeed as reqFetchcAllFeed,
  postBoardFeed as reqPostBoardFeed,
  deleteFeed as reqDeleteFeed,
  postVoteFeed as reqPostVoteFeed,
  postVote as reqPostVote,
  postLike as reqPostLike,
  postUnlike as reqPostUnlike,
  fetchMyFeedCount as reqFetchMyFeedCount,
} from "~/lib/apis/feed";

const initialState = {
  myFeed: [],
  allFeed: [],
  otherFeed: [],
  aFeed: null,
  myFeedCount: null,
  mypageFeedCount: null,
  loading: "idle",
};

const fetchAFeed = createAsyncThunk(
  "feed/fetchAFeed",
  async (feedId, thunkAPI) => {
    const response = await reqFetchAFeed(feedId);
    return response;
  }
);

const fetchMyFeed = createAsyncThunk(
  "feed/fetchMyFeed",
  async ({ userId, page }, thunkAPI) => {
    const response = await reqFetchMyFeed(userId, page);
    return response;
  }
);
const fetchOtherFeed = createAsyncThunk(
  "feed/fetchOtherFeed",
  async ({ userId, page }, thunkAPI) => {
    const response = await reqFetchOtherFeed(userId, page);
    return response;
  }
);

const fetchAllFeed = createAsyncThunk(
  "feed/fetchAllFeed",
  async (page, thunkAPI) => {
    const response = await reqFetchcAllFeed(page);
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

const deleteFeed = createAsyncThunk(
  "feed/deleteFeed",
  async (feedId, thunkAPI) => {
    const response = await reqDeleteFeed(feedId);
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

const postVote = createAsyncThunk(
  "feed/postVote",
  async ({ feedId, voteResult }, thunkAPI) => {
    const response = await reqPostVote(feedId, voteResult);
    return response;
  }
);

const postLike = createAsyncThunk("feed/postLike", async (feedId, thunkAPI) => {
  const response = await reqPostLike(feedId);
  return response;
});

const postUnlike = createAsyncThunk(
  "feed/postUnlike",
  async (feedId, thunkAPI) => {
    const response = await reqPostUnlike(feedId);
    return response;
  }
);

const fetchMyFeedCount = createAsyncThunk(
  "feed/fetchMyFeedCount",
  async (userId, thunkAPI) => {
    const response = await reqFetchMyFeedCount(userId);
    return response;
  }
);

const fetchMyPageFeedCount = createAsyncThunk(
  "feed/fetchMyPageFeedCount",
  async (userId, thunkAPI) => {
    const response = await reqFetchMyFeedCount(userId);
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

        state.myFeed = [...state.myFeed, ...action.payload];
      })
      .addCase(fetchMyFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchOtherFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        if (action.payload === "") {
          state.otherFeed = [];
        }
        state.otherFeed = [...state.otherFeed, ...action.payload];
      })
      .addCase(fetchOtherFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchOtherFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchAllFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.allFeed = [...state.allFeed, ...action.payload];
      })
      .addCase(fetchAllFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postBoardFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(postBoardFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postBoardFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";

        const deletedFeedId = action.meta.arg;

        state.allFeed = state.allFeed.filter(
          (feed) => feed._id !== deletedFeedId
        );

        state.myFeed = state.myFeed.filter(
          (feed) => feed._id !== deletedFeedId
        );
      })
      .addCase(deleteFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postVoteFeed.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(postVoteFeed.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postVoteFeed.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postVote.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postVote.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postVote.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postLike.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postLike.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLike.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postUnlike.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postUnlike.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postUnlike.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchMyFeedCount.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.myFeedCount = action.payload.postCount;
      })
      .addCase(fetchMyFeedCount.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyFeedCount.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchMyPageFeedCount.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.mypageFeedCount = action.payload.postCount;
      })
      .addCase(fetchMyPageFeedCount.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyPageFeedCount.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export {
  fetchAFeed,
  fetchMyFeed,
  fetchOtherFeed,
  fetchAllFeed,
  postBoardFeed,
  postVoteFeed,
  postVote,
  postLike,
  postUnlike,
  deleteFeed,
  fetchMyFeedCount,
  fetchMyPageFeedCount,
};
export default feedSlice.reducer;
