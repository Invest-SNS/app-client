import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAD, getADOSC, getADX, getADXR, getAROON, getAROONOSC, getATR, getCCI, getDX, getMACD, getMFI, getMOM, getOBV, getPPO, getROC, getRSI, getSTOCH, getSTOCHF, getSTOCHRSI, getTRIX, getULTOSC, getWILLR } from "../../../../lib/apis/chart";

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

export const getSTOCHFChart = createAsyncThunk(
  "chart/getSTOCHF",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSTOCHF(data);
    return response.data;
  }
)

export const getSTOCHChart = createAsyncThunk(
  "chart/getSTOCH",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSTOCH(data);
    return response.data;
  }
)

export const getRSIChart = createAsyncThunk(
  "chart/getRSI",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getRSI(data);
    return response.data;
  }
)

export const getCCIChart = createAsyncThunk(
  "chart/getCCI",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getCCI(data);
    return response.data;
  }
)

export const getMOMChart = createAsyncThunk(
  "chart/getMOM",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getMOM(data);
    return response.data;
  }
)

export const getROCChart = createAsyncThunk(
  "chart/getROC",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getROC(data);
    return response.data;
  }
)

export const getADChart = createAsyncThunk(
  "chart/getAD",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getAD(data);
    return response.data;
  }
)

export const getATRChart = createAsyncThunk(
  "chart/getATR",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getATR(data);
    return response.data;
  }
)

export const getMFIChart = createAsyncThunk(
  "chart/getMFI",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getMFI(data);
    return response.data;
  }
)

export const getOBVChart = createAsyncThunk(
  "chart/getOBV",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getOBV(data);
    return response.data;
  }
)

export const getADOSCChart = createAsyncThunk(
  "chart/getADOSC",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getADOSC(data);
    return response.data;
  }
)

export const getTRIXChart = createAsyncThunk(
  "chart/getTRIX",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getTRIX(data);
    return response.data;
  }
)

export const getWILLRChart = createAsyncThunk(
  "chart/getWILLR",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getWILLR(data);
    return response.data;
  }
)

export const getDXChart = createAsyncThunk(
  "chart/getDX",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getDX(data);
    return response.data;
  }
)

export const getADXChart = createAsyncThunk(
  "chart/getADX",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getADX(data);
    return response.data;
  }
)

export const getADXRChart = createAsyncThunk(
  "chart/getADXR",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getADXR(data);
    return response.data;
  }
)

export const getAROONChart = createAsyncThunk(
  "chart/getAROON",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getAROON(data);
    return response.data;
  }
)

export const getAROONOSCChart = createAsyncThunk(
  "chart/getAROONOSC",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getAROONOSC(data);
    return response.data;
  }
)

export const getSTOCHRSIChart = createAsyncThunk(
  "chart/getSTOCHRSI",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getSTOCHRSI(data);
    return response.data;
  }
)

export const getULTOSCChart = createAsyncThunk(
  "chart/getULTOSC",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getULTOSC(data);
    return response.data;
  }
)

export const getPPOChart = createAsyncThunk(
  "chart/getPPO",
  async (data, tunkAPI) => {
    // const { code, start_date, end_date, time_format } = data;
    const response = await getPPO(data);
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
