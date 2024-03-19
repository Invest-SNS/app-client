import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    code: "005930",
    market: "kospi",
    market_code: "KR7005930003",
    name: "삼성전자",
    __v: 0,
    _id: "65f24176b5fd9b9fdc483b63",
  }
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
