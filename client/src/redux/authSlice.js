import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";

const initialState = {
  // token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isAuthenticated: false,
  registerStatus: null,
  registerError: null,
  loginStatus: null,
  loginError: null,
  loadUserStatus: null,
  loadUserError: null,
  logOutStatus: null,
  logOutError: null,
  user: null,
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/register`, user, setHeaders());
      // localStorage.setItem("token", response.data);
      return response?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/login`, user, setHeaders());
      // localStorage.setItem("token", response.data);
      return response?.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  try {
    const response = await axios.get(`${url}/users/profile`, setHeaders());
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
  }
});

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    await axios.get(`${url}/logout`, setHeaders());
  } catch (error) {
    console.log(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.registerStatus = "pending";
    },
    [registerUser.fulfilled]: (state, action) => {
      // state.user = action.payload.user;
      state.isAuthenticated = true;
      state.registerStatus = "success";
    },
    [registerUser.rejected]: (state, action) => {
      state.registerStatus = "rejected";
      state.registerError = action.payload;
    },
    [loginUser.pending]: (state) => {
      state.loginStatus = "pending";
    },
    [loginUser.fulfilled]: (state, action) => {
      // state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loginStatus = "success";
    },
    [loginUser.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      state.isAuthenticated = false;
      state.userLoaded = false;
      state.loginError = action.payload;
    },
    [loadUser.pending]: (state, action) => {
      state.loadUserStatus = "pending";
    },
    [loadUser.fulfilled]: (state, action) => {
      const user = action.payload;
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        state.loadUserStatus = "success";
        state.userLoaded = true;
      } else {
        return state;
      }
    },
    [loadUser.rejected]: (state, action) => {
      state.loadUserStatus = "rejected";
      state.userLoaded = false;
      state.user = {};
    },
    [logOut.pending]: (state, action) => {
      state.logOutStatus = "pending";
    },
    [logOut.fulfilled]: (state, action) => {
      state.userLoaded = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    [logOut.rejected]: (state, action) => {
      state.logOutStatus = "rejected";
    },
  },
});

// export const { loadUser } = authSlice.actions;
export default authSlice.reducer;
