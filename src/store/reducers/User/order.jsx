import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchMyOrder as reqFetchMyOrder,
  getOrderHistory as reqGetOrderHistory,
} from "../../../lib/apis/order";

const initialState = {
  myMoney: {},
  mystocks: [],
  reservedHistory: [],
  completedHistory: [],
  uniqueCompletedHistory: [],
  loading: "idle",
};

export const fetchMyOrder = createAsyncThunk(
  "order/fetchMyOrder",
  async (data, thunkAPI) => {
    const response = await reqFetchMyOrder();
    return response;
  }
);

export const getOrderHistory = createAsyncThunk(
  "order/getOrderHistory",
  async ({ code, userId }, thunkAPI) => {
    const response = await reqGetOrderHistory(code, userId);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setUniqueCompletedHistory: (state, action) => {
      state.uniqueCompletedHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrder.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.myMoney = action.payload.myMoney[0];
        state.mystocks = action.payload.mystocks;
      })
      .addCase(fetchMyOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyOrder.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.reservedHistory = action.payload.reservedHistory;
        state.completedHistory = action.payload.completedHistory;
      })
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getOrderHistory.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { setUniqueCompletedHistory } = orderSlice.actions;

export default orderSlice.reducer;
