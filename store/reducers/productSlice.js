import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
	products: [],
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProductData: (state, { payload }) => {
			state.products = payload;
		},
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
export const { setProductData, getProductsData } = productSlice.actions;

export default productSlice.reducer;
