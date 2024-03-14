import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData } from '../../../lib/apis/chart'

const initialState = {
  datas: [],
};

export const getChartDatas = createAsyncThunk(
  "chart/getData",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getChartData();
    return response.data;
  }
)

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.datas = action.payload;
    })
  },
});

export default chartSlice.reducer;
