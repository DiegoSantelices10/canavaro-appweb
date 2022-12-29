import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from 'services/fetchData';
const initialState = {
	products: [],
};

export const productsList = createAsyncThunk('products', async (body, thunkAPI) => {
	const response = await getProducts();
	return response;
});

export const productSlice = createSlice({
	name: 'product',
	initialState,
	extraReducers: builder => {
		builder.addCase(productsList.fulfilled, (state, { payload }) => {
			state.products = payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
