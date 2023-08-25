import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostName } from "../config";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredential) => {
    const request = await axios.post(`${hostName}/login`, userCredential);
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userCredential) => {
    const request = await axios.post(
      `${hostName}/registration`,
      userCredential
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: "",
    error: "",
    msg: "",
    token: "",
  },
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
    // [loginUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [loginUser.fulfilled]: (
    //   state,
    //   { payload: { error, msg, token, user } }
    // ) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //   } else {
    //     state.msg = msg;
    //     state.token = token;
    //     state.user = user;
    //   }

    //   localStorage.setItem("msg", msg);
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));
    // },
    // [loginUser.rejected]: (state, action) => {
    //   state.loading = true;
    // },

    // [signUpUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [signUpUser.fulfilled]: (state, { payload: { error, msg } }) => {
    //   state.loading = false;
    //   if (error) {
    //     state.error = error;
    //   } else {
    //     state.msg = msg;
    //   }
    // },
    // [signUpUser.rejected]: (state, action) => {
    //   state.loading = true;
    // },
  },
});

export const { addToken, addUser, logout } = userSlice.actions;
export default userSlice.reducer;
