import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getkospiKosdaq } from "../../../lib/apis/chart";

const initialState = {
  data: [],
};

export const getkospiKosdaqDatas = createAsyncThunk(
  "chart/getkospiKosdaq",
  async (data, tunkAPI) => {
    const response = await getkospiKosdaq();
    return response.data;
  }
)

const kospiSlice = createSlice({
  name: "kospi",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getkospiKosdaqDatas.fulfilled, (state, action) => {
      state.data = action.payload;
    }),
    // builder.addCase(getkospiKosdaqDatas.pending, (state, action) => {
    //   state.hotData = action.payload;
    // }),
    builder.addCase(getkospiKosdaqDatas.rejected, (state, action) => {
      state.data = [];
    })
  },
});

export default kospiSlice.reducer;
