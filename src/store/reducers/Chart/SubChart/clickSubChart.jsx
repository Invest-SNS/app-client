import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SMA: false,
  WMA: false,
  EMA: false,
  BBANDS: false,
  SAR: false,
};

const clickSubSlice = createSlice({
  name: "subChart",
  initialState: initialState,
  reducers: {
    setActiveSub(state, action) {
      state[action.payload] = true;
    },
    setDisactiveSub(state, action) {
      state[action.payload] = false;
    },
  },
});

const { setActiveSub, setDisactiveSub } = clickSubSlice.actions;
export { setActiveSub, setDisactiveSub };

export default clickSubSlice.reducer;
