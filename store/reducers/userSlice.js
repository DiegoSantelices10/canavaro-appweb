/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	direccion: "",
	telefono: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.direccion = action.payload.direccion;
			state.telefono = action.payload.telefono;
		},
		unsetUser: (state, action) => {
			state.direccion = "";
			state.telefono = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
