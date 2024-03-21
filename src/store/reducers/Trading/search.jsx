import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postSearch as reqPostSearch,
  postSearchUser as reqPostSearchUser,
  postLikeStock as reqPostLikeStock,
} from "~/lib/apis/search";

const initialState = {
  searchResults: [],
  favoriteArr: [],
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
  async ({ searchQuery }, thunkAPI) => {
    const response = await reqPostSearchUser(searchQuery);
    return response;
  }
);

const postLikeStock = createAsyncThunk(
  "search/postLikeStock",
  async ({ likeStock }, thunkAPI) => {
    const response = await reqPostLikeStock(likeStock);
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
        console.log("payload", action.payload);
        state.favoriteArr = action.payload;
        state.loading = "idle";
      })
      .addCase(postLikeStock.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLikeStock.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { setFavoriteArr } = searchSlice.actions;
export { postSearch, postSearchUser, postLikeStock };
export default searchSlice.reducer;
