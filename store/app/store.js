import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "store/reducers/orderSlice";
import userReducer from "store/reducers/userSlice";
import productReducer from "store/reducers/productSlice";

export const store = configureStore({
	reducer: {
		product: productReducer,
		order: orderReducer,
		user: userReducer,
	},
	devTools: true,
});
