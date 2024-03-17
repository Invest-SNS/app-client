import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin as reqPostLogin } from "~/lib/apis/user";

const initialState = {
  loading: "idle",
};

const postLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    await reqPostLogin(email, password);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(postLogin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLogin.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export { postLogin };
export default userSlice.reducer;
