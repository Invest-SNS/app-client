import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postSearch as reqPostSearch,
  postSearchUser as reqPostSearchUser,
  postLikeStock as reqPostLikeStock,
  fetchLikeStock as reqFetchLikeStock,
  fetchLikeStockArr as reqFetchLikeStockArr,
} from "~/lib/apis/search";

const initialState = {
  searchResults: [],
  favoriteArr: [],
  myFavoriteArr: [],
  loading: "idle",
};

const postSearch = createAsyncThunk(
  "search/postSearch",
  async ({ searchQuery }, thunkAPI) => {
    const response = await reqPostSearch(searchQuery);
    return response;
  }
);

const postSearchUser = createAsyncThunk(
  "search/postSearchUser",
  async ({ searchQuery, userId }, thunkAPI) => {
    const response = await reqPostSearchUser(searchQuery, userId);
    return response;
  }
);

const postLikeStock = createAsyncThunk(
  "search/postLikeStock",
  async ({ likeStock, userId }, thunkAPI) => {
    const response = await reqPostLikeStock(likeStock, userId);
    return response;
  }
);

const fetchLikeStock = createAsyncThunk(
  "search/fetchLikeStock",
  async (userId, thunkAPI) => {
    const response = await reqFetchLikeStock(userId);
    return response;
  }
);

const fetchLikeStockArr = createAsyncThunk(
  "search/fetchLikeStockArr",
  async (userId, thunkAPI) => {
    const response = await reqFetchLikeStockArr(userId);
    return response;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setFavoriteArr: (state, action) => {
      state.favoriteArr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSearch.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = "idle";
      })
      .addCase(postSearch.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postSearch.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postSearchUser.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = "idle";
      })
      .addCase(postSearchUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postSearchUser.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(postLikeStock.fulfilled, (state, action) => {
        state.favoriteArr = action.payload;
        state.loading = "idle";
      })
      .addCase(postLikeStock.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLikeStock.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchLikeStock.fulfilled, (state, action) => {
        state.myFavoriteArr = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchLikeStock.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLikeStock.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchLikeStockArr.fulfilled, (state, action) => {
        state.favoriteArr = action.payload;
        state.loading = "idle";
      })
      .addCase(fetchLikeStockArr.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchLikeStockArr.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { setFavoriteArr } = searchSlice.actions;
export {
  postSearch,
  postSearchUser,
  postLikeStock,
  fetchLikeStock,
  fetchLikeStockArr,
};
export default searchSlice.reducer;
