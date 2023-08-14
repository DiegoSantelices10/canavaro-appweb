/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nombre: "",
  telefono: "",
  direccion: "",
  hPersonalizado: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.nombre = payload.nombre;
      state.telefono = payload.telefono;
      state.direccion = payload.direccion;
      state.hPersonalizado = payload.hPersonalizado
    },
    addAddress: (state, { payload }) => {
      state.direccion = payload?.direccion;
    },

    clearUser: (state, action) => {
      state.nombre = "";
      state.telefono = "";
      state.direccion = "";
      state.hPersonalizado = ""
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, addAddress, clearUser } = userSlice.actions;

export default userSlice.reducer;
