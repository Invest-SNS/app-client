import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMACD } from "../../../../lib/apis/chart";

const initialState = {
  MACDDatas: [],
};

export const getMACDChart = createAsyncThunk(
  "chart/getMACD",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getMACD(data);
    return response.data;
  }
)

const subIndicatorSlice = createSlice({
  name: "subIndicator",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  },
});

export default subIndicatorSlice.reducer;
