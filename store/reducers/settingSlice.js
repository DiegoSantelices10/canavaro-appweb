/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryButton: {},
  promoBarra: {},
  promoEfectivo: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, { payload }) => {
      state.deliveryButton = payload.deliveryButton;
      state.promoBarra = payload.promoBarra;
      state.promoEfectivo = payload.promoEfectivo;
    },
    setPromoBarra: (state, { payload }) => {
      state.promoBarra = payload.promoBarra;
    },
    setPromoEfectivo: (state, { payload }) => {
      state.promoEfectivo = payload.promoEfectivo;
    },

  },
});

// Action creators are generated for each case reducer function
export const { setSetting, setPromoBarra } = settingSlice.actions;

export default settingSlice.reducer;
