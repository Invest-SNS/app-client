import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTab: "매수",
  selectedPrice: null,
  selectedQuantity: 0,
  scrollPosition: 100,
  orderType: "지정가", // 시장가, 지정가 가격 input
  isNew: false,
};

const tradingSlice = createSlice({
  name: "trading",
  initialState: initialState,
  reducers: {
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    setSelectedPrice(state, action) {
      state.selectedPrice = action.payload;
    },
    setSelectedQuantity(state, action) {
      state.selectedQuantity = action.payload;
    },
    setScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
    setOrderType(state, action) {
      state.orderType = action.payload;
    },
    increaseSelectedQuantity(state) {
      state.selectedQuantity += 1;
    },
    setIsNew(state, action) {
      state.isNew = action.payload;
    },
    decreaseSelectedQuantity(state) {
      if (state.selectedQuantity > 0) {
        state.selectedQuantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setSelectedPrice,
  setScrollPosition,
  setSelectedTab,
  setOrderType,
  setSelectedQuantity,
  increaseSelectedQuantity,
  decreaseSelectedQuantity,
  setIsNew,
} = tradingSlice.actions;
export default tradingSlice.reducer;
