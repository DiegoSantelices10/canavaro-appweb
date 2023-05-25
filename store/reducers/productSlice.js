import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

export const getProductos = createAsyncThunk("product/get", async (userId, thunkAPI) => {
	const response = await fetch("/api/products");
	const data = await response.json();
	return data;
});

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProductData: (state, { payload }) => {
			state.products = payload;
			localStorage.setItem("productos", JSON.stringify(payload));
		},
		getProductsData: (state, { payload }) => {
			return state;
		},
	},
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(getProductos.fulfilled, (state, action) => {
			// Add user to the state array
			state.products = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setProductData, getProductsData } = productSlice.actions;

export default productSlice.reducer;
