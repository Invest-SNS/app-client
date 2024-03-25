import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStrategy } from "../../../lib/apis/strategy";

const initialState = {
  strategy: {},
};

export const getStrategyDatas = createAsyncThunk(
  "chart/getStrategyDatas",
  async (data, tunkAPI) => {
    const response = await getStrategy();
    return response.data;
  }
)

const strategySlice = createSlice({
  name: "strategy",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStrategyDatas.fulfilled, (state, action) => {
      state.strategy = action.payload;
    })
  },
});

export default strategySlice.reducer;
