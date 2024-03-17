import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    SMA: [5, 20, 60, 120, 240],
    WMA: [5, 20, 60, 120, 240],
    EMA: [5, 20, 60, 120, 240],
    BBANDS: [20, 2],
    SAR: [0.02, 0.2],
  },
};

const chartValuesSlice = createSlice({
  name: "chartValues",
  initialState: initialState,
  reducers: {
    setValues: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export const { setValues } = chartValuesSlice.actions;
export default chartValuesSlice.reducer;
