import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBBANDS, getEMA, getSAR, getSMA, getWMA } from "../../../../lib/apis/chart";

const initialState = {
  SMADatas: [],
  WMADatas: [],
  EMADatas: [],
  BBANDSDatas: [],
  SARDatas: [],
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

const chartIndicatorSlice = createSlice({
  name: "chartIndicator",
  initialState: initialState,
  reducers: {
    setSMADatas(state, action) {
      state.SMADatas = action.payload;
    },
    setWMADatas(state, action) {
      state.WMADatas = action.payload;
    },
    setEMADatas(state, action) {
      state.EMADatas = action.payload;
    },
    setBBANDSDatas(state, action) {
      state.BBANDSDatas = action.payload;
    },
    setSARDatas(state, action) {
      state.SARDatas = action.payload;
    },
  },
  extraReducers: (builder) => {
  },
});

const { setSMADatas, setWMADatas, setEMADatas, setBBANDSDatas, setSARDatas } = chartIndicatorSlice.actions;
export { setSMADatas, setWMADatas, setEMADatas, setBBANDSDatas, setSARDatas };

export default chartIndicatorSlice.reducer;
