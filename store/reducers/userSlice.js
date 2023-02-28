/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	nombre: "",
	telefono: "",
	direccion: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.nombre = action.payload.nombre;
			state.telefono = action.payload.telefono;
			state.direccion = "";
		},
		addAddress: (state, action) => {
			state.direccion = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, addAddress } = userSlice.actions;

export default userSlice.reducer;
