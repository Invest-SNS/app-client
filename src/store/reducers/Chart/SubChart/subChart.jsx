import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBBANDS, getEMA, getSAR, getSMA, getWMA } from "../../../../lib/apis/chart";

const initialState = {
  SMADatas: [],
};

export const getSMAChart = createAsyncThunk(
  "chart/getSMA",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSMA(data);
    return response.data;
  }
)

export const getWMAChart = createAsyncThunk(
  "chart/getWMA",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getWMA(data);
    return response.data;
  }
)

export const getEMAChart = createAsyncThunk(
  "chart/getEMA",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getEMA(data);
    return response.data;
  }
)

export const getBBANDSChart = createAsyncThunk(
  "chart/getBBANDS",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getBBANDS(data);
    return response.data;
  }
)

export const getSARChart = createAsyncThunk(
  "chart/getSAR",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSAR(data);
    return response.data;
  }
)

const subChartSlice = createSlice({
  name: "subChart",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
  },
});

export default subChartSlice.reducer;
