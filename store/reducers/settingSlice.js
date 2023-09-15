/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryButton: {},
  promoBarra: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, { payload }) => {
      state.deliveryButton = payload.deliveryButton;
      state.promoBarra = payload.promoBarra;
    },
    setPromoBarra: (state, {payload}) => {
      state.promoBarra = payload.promoBarra;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setSetting, setPromoBarra } = settingSlice.actions;

export default settingSlice.reducer;
