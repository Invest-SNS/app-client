import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData, getMinuteData } from '../../../lib/apis/chart'

const initialState = {
  datas: [],
  date: "D",
};

export const getChartDatas = createAsyncThunk(
  "chart/getData",
  async (data, tunkAPI) => {
    const response = await getChartData(data);
    return response.data;
  }
)

export const getMinuteDatas = createAsyncThunk(
  "chart/getMinuteData",
  async (data, tunkAPI) => {
    const response = await getMinuteData(data);
    return response.data;
  }
)

const chartSlice = createSlice({
  name: "chart",
  initialState: initialState,
  reducers: {
    setChartDatas(state, action) {
      state.datas = action.payload;
    },
    setClickDate(state, action) {
      state.date = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
    }),
    builder.addCase(getMinuteDatas.fulfilled, (state, action) => {
      state.datas = action.payload.reverse();
    })
  },
});

const { setChartDatas, setClickDate } = chartSlice.actions;
export { setChartDatas, setClickDate };

export default chartSlice.reducer;
