import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postLogin as reqPostLogin } from "~/lib/apis/user";

const initialState = {
  user: null,
  loading: "idle",
};

const postLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    const response = await reqPostLogin(email, password);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.user = action.payload;
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
