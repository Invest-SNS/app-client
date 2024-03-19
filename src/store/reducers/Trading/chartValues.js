import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: {
    SMA: [5, 10, 20, 60, 120],
    WMA: [5, 10, 20, 60, 120],
    EMA: [5, 10, 20, 60, 120],
    BBANDS: [5, 2],
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
