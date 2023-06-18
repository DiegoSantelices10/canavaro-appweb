import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	sales: [],
	renderSales: [],
};

export const saleSlice = createSlice({
	name: "sale",
	initialState,
	reducers: {
		setRenderSaleData: (state, { payload }) => {
			state.renderSales = payload;
		},
		setSaleData: (state, { payload }) => {
			state.sales = payload;
		},
		addSale: (state, { payload }) => {
			state.sales.push(payload);
			state.renderSales.push(payload);
		},
		updateSale: (state, { payload }) => {
			console.log("id", payload);
			const newList = state.renderSales.filter(item => item._id !== payload);
			state.renderSales = newList;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setSaleData, addSale, updateSale, setRenderSaleData } = saleSlice.actions;

export default saleSlice.reducer;
