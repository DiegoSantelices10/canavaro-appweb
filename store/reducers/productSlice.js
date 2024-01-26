import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
	products: [],
	extras: []
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProductData: (state, { payload }) => {
			state.products = payload;
		},
		setExtras: (state, { payload }) => {
			state.extras = payload
		}
	},

	extraReducers: builder => {
		builder.addCase(HYDRATE, (state, action) => {
			return {
				...state,
				...action.payload.product,
			};
		});
	},
});

// Action creators are generated for each case reducer function
export const { setProductData, getProductsData, setExtras } = productSlice.actions;

export default productSlice.reducer;
