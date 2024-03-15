import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subChart: [],
};

const clickSubSlice = createSlice({
  name: "subChart",
  initialState: initialState,
  reducers: {
    setClickSub(state, action) {
      state.data = action.payload;
    }
  },
});

const { setClickSub } = clickSubSlice.actions;
export { setClickSub };

export default clickSubSlice.reducer;
