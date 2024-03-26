import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../../lib/apis/user";

const initialState = {
  user: {},
  loading: "idle",
  error: ""
};

export const postLogin = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    const response = await login(data.email, data.password);
    return response;
  }
);

export const postLogout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    const response = await logout();
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        if (action.payload.response.status === '201') {
          state.user = action.payload.data;
          state.loading = "fulfilled";
        }
      })
      .addCase(postLogin.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLogin.rejected, (state) => {
        state.loading = "rejected";
      });
    builder
      .addCase(postLogout.fulfilled, (state, action) => {
          // state.error = action.payload.response.data.error;
          state.user = {};
          state.loading = "fulfilled";
        }
      )
      .addCase(postLogout.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postLogout.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

const { setError } = userSlice.actions;
export { setError };

export default userSlice.reducer;
