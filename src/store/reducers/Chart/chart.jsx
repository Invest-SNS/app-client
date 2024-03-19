import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData } from '../../../lib/apis/chart'

const initialState = {
  datas: [],
};

export const getChartDatas = createAsyncThunk(
  "chart/getData",
  async (data, tunkAPI) => {
    const response = await getChartData(data);
    return response.data;
  }
)

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
    setChartDatas(state, action) {
      state.datas = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
    })
  },
});

const { setChartDatas } = chartSlice.actions;
export { setChartDatas };

export default chartSlice.reducer;
