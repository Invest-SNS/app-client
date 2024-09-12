import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotStock, getPopularStock } from "../../../lib/apis/hot";

const initialState = {
  popularData: [],
  hotData: [],
  loading: false,
};

export const getPopularDatas = createAsyncThunk(
  "chart/getPopularData",
  async (data, tunkAPI) => {
    const response = await getPopularStock();
    return response.data;
  }
)

export const getHotDatas = createAsyncThunk(
  "chart/getHotData",
  async (data, tunkAPI) => {
    const response = await getHotStock(data);
    return response.data;
  }
)

const hotStockSlice = createSlice({
  name: "hotStock",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularDatas.fulfilled, (state, action) => {
      state.popularData = action.payload;
    }),
    builder.addCase(getPopularDatas.rejected, (state, action) => {
      state.popularData = [];
    }),
    builder.addCase(getHotDatas.fulfilled, (state, action) => {
      state.hotData = action.payload;
      state.loading = false;
    }),
    builder.addCase(getHotDatas.pending, (state, action) => {
      state.loading = true;
    }),
    builder.addCase(getHotDatas.rejected, (state, action) => {
      state.hotData = [];
      state.loading = false;
    })
  },
});

export default hotStockSlice.reducer;
