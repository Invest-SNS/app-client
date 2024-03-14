import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    accvolume: "333333",
    code: "005930",
    favorite: true,
    id: 1,
    index: "코스피",
    name: "삼성전자",
    prdy_vrss: "1100",
    price: "72800",
    returns: "0.55%",
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
