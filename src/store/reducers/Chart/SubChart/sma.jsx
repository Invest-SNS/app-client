import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSMA } from '../../../lib/apis/chart'

const initialState = {
  datas: [],
};

export const getSMAData = createAsyncThunk(
  "subChart/getSMA",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSMA(data);
    return response.data;
  }
)

const smaSlice = createSlice({
  name: "subChart",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getSMAData.fulfilled, (state, action) => {
      state.datas = action.payload;
    })
  },
});

export default smaSlice.reducer;
