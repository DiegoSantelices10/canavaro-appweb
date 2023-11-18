import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import orderReducer from "store/reducers/orderSlice";
import userReducer from "store/reducers/userSlice";
import productReducer from "store/reducers/productSlice";
import saleSlice from "store/reducers/saleSlice";
import authSlice from "store/reducers/authSlice";
import settingSlice from "store/reducers/settingSlice";

export const makeStore = () =>
	configureStore({
		reducer: {
			product: productReducer,
			order: orderReducer,
			user: userReducer,
			sale: saleSlice,
			auth: authSlice,
			setting: settingSlice
		},
		devTools: false,
	});

export const wrapper = createWrapper(makeStore, { debug: false });
