/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    clearAuth: (state, action) => {
      state.username = "";
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
