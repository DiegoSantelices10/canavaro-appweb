import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	sales: [],
};

export const saleSlice = createSlice({
	name: "sale",
	initialState,
	reducers: {
		setSaleData: (state, { payload }) => {
			state.sales = payload;
		},
		addSale: (state, { payload }) => {
			state.sales.push(payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSaleData, addSale } = saleSlice.actions;

export default saleSlice.reducer;
