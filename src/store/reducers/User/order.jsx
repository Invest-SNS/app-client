import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMyOrder as reqFetchMyOrder } from "../../../lib/apis/order";

const initialState = {
  myMoney: {},
  mystocks: [],
  loading: "idle",
};

export const fetchMyOrder = createAsyncThunk(
  "order/fetchMyOrder",
  async (data, thunkAPI) => {
    const response = await reqFetchMyOrder();
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrder.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        console.log("payloads", action.payload);
        console.log("payloadss", action.payload.myMoney[0]);
        console.log("payloadsss", action.payload.mystocks);
        state.myMoney = action.payload.myMoney[0];
        state.mystocks = action.payload.mystocks;
      })
      .addCase(fetchMyOrder.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyOrder.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default orderSlice.reducer;
