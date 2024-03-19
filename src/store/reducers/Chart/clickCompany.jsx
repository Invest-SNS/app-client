import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {}
};

const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    setClickCompany(state, action) {
      state.data = action.payload;
    }
  },
});

const { setClickCompany } = companySlice.actions;
export { setClickCompany };

export default companySlice.reducer;
