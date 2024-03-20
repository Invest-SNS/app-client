import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    MACD: [26, 12, 9],
    STOCHF: [14, 3],
    STOCH: [14, 3, 3],
    RSI: [10],
    CCI: [20],
    MOM: [10],
    ROC: [10],
    AD: [],
    ATR: [20],
    MFI: [14],
    OBV: [],
    ADOSC: [10, 3],
    TRIX: [12],
    WILLR: [14],
    DX: [14],
    ADX: [14],
    ADXR: [14],
    AROON: [25],
    AROONOSC: [25],
    STOCHRSI: [14, 14, 3],
    ULTOSC: [28, 14, 7],
    PPO: [26, 12],
  },
};

const indicatorValuesSlice = createSlice({
  name: "indicatorValues",
  initialState: initialState,
  reducers: {
    setValues: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const { setValues } = indicatorValuesSlice.actions;
export default indicatorValuesSlice.reducer;
