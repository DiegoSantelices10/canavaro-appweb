import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orderList: [],
	orderPromo: [],
	quantityDemanded: 0,
	totalQuantity: 0,
	totalAmount: 0,
	delivery: "domicilioActual",
	demora: "",
	checkout: [],
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setDelivery: (state, { payload }) => {
			state.delivery = payload
		},
		setDemora: (state, action) => {
			state.demora = action.payload;
		},
		setCheckout: (state, action) => {
			state.checkout = action.payload;
		},
		setQuantityDemanded: (state, action) => {
			state.quantityDemanded = action.payload;
		},
		addProductPizza: (state, action) => {
			if (action.payload.categoria === "pizzas") {
				const productIndex = state.orderPromo.findIndex(item => item.tamanio === action.payload.tamanio);
				productIndex >= 0 ? (state.orderPromo[productIndex].cantidad += 1) : state.orderPromo.push({ ...action.payload, cantidad: 1 });
			}
		},
		addProductEmpanada: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item._id === action.payload._id);
			if (productIndex >= 0) {
				state.orderPromo[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.orderPromo.push(tempProduct);
			}
		},
		addPromoOrderList: (state, action) => {
			state.orderList.push(action.payload);
		},
		setOrderListLocal: (state, action) => {
			state.orderList = action.payload
		},
		addProductPromo: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item._id === action.payload._id);
			if (productIndex >= 0) {
				state.orderPromo[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.orderPromo.push(tempProduct);
			}
		},
		decrementProductPromo: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item._id === action.payload._id);
			if (state.orderPromo[productIndex].cantidad > 1) {
				state.orderPromo[productIndex].cantidad -= 1;
			} else if (state.orderPromo[productIndex].cantidad === 1) {
				const newList = state.orderPromo.filter(item => item._id !== action.payload._id);
				state.orderPromo = newList;
			}
		},
		decrementProductPizza: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item._id === action.payload._id);
			if (state.orderPromo[productIndex].cantidad > 1) {
				state.orderPromo[productIndex].cantidad -= 1;
			} else if (state.orderPromo[productIndex].cantidad === 1) {
				const newList = state.orderPromo.filter(item => item._id !== action.payload._id);
				state.orderPromo = newList;
			}
		},
		clearOrderPromo: (state, action) => {
			state.orderPromo = [];
		},
		clearOrderList: (state, action) => {
			state.orderList = [];
		},
		removeProduct: (state, action) => {
			state.orderPromo = state.orderPromo.filter(product => product._id !== action.payload._id);
		},
		removeItemCart: (state, action) => {
			state.orderList = state.orderList.filter(product => product._id !== action.payload);
		},

		calculateSubTotal: (state, action) => {
			const array = [];
			state.orderList.map(item => {
				const { precio, cantidad } = item;
				const listItemAmount = precio * cantidad;
				return array.push(listItemAmount);
			});

			const totalAmount = array.reduce((a, b) => {
				return a + b;
			}, 0);
			state.totalAmount = totalAmount;
		},

		calculateTotalQuantity: (state, action) => {
			const array = [];
			state.orderList.map(item => {
				const { cantidad } = item;
				return array.push(cantidad);
			});
			const totalQuantity = array.reduce((a, b) => {
				return a + b;
			}, 0);
			state.totalQuantity = totalQuantity;
		},
		setTotalAmount: (state, { payload }) => {
			state.totalAmount = payload
		}
	},
});

// Action creators are generated for each case reducer function
export const {
	addProductPizza,
	addProductEmpanada,
	addProductPromo,
	decrementProductPromo,
	decrementProductPizza,
	removeProduct,
	setDemora,
	calculateSubTotal,
	calculateTotalQuantity,
	addPromoOrderList,
	setOrderListLocal,
	clearOrderPromo,
	setQuantityDemanded,
	setCheckout,
	setDelivery,
	removeItemCart,
	clearOrderList,
	setTotalAmount
} = orderSlice.actions;

export default orderSlice.reducer;
