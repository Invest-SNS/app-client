import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, signup } from "../../../lib/apis/user";
import { removeCookie, setCookie } from "../../../lib/apis/cookie";

const initialState = {
  user: {},
  loading: "idle",
};

export const postSignup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    const response = await signup(data.email, data.password, data.nickname);
    return response;
  }
);

export const postLogin = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    const response = await login(data.email, data.password);
    setCookie("token", response.data.token, {
      path: "/",
      // secure: true,
    });
    return response;
  }
);

export const postLogout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    const response = await logout(data);
    removeCookie("token");

    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = "fulfilled";
    },
  },
  extraReducers: (builder) => {},
});

const { setUser } = userSlice.actions;
export { setUser };

export default userSlice.reducer;
