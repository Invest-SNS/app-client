import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "매수",
  priceGap: 0,
  maxQuantity: 0,
  selectedPrice: 0,
  scrollPosition: 100,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState: initialState,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    setPriceGap(state, action) {
      state.priceGap = action.payload;
    },
    setSelectedPrice(state, action) {
      state.selectedPrice = action.payload;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setPriceGap,
  selectedPrice,
  setSelectedPrice,
  setScrollPosition,
  setSelectedTab,
} = tradingSlice.actions;
export default tradingSlice.reducer;
