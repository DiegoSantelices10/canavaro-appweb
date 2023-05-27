/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	nombre: "",
	password: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.nombre = action.payload.nombre;
			state.password = action.payload.password;
		},

		clearAuth: (state, action) => {
			state.nombre = "";
			state.password = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
