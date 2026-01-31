import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orderList: [],
	orderPromo: [],
	bebidas: [],
	postres: [],
	quantityDemanded: 0,
	quantityDemandedDrinks: 0,
	quantityDemandedPostres: 0,
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
		setQuantityDemandedDrinks: (state, action) => {
			state.quantityDemandedDrinks = action.payload;
		},
		setQuantityDemandedPostres: (state, action) => {
			state.quantityDemandedPostres = action.payload;
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
		addDrinksPromo: (state, action) => {
			const productIndex = state.bebidas.findIndex(item => item._id === action.payload._id);
			if (productIndex >= 0) {
				state.bebidas[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.bebidas.push(tempProduct);
			}
		},
		decrementDrinksPromo: (state, action) => {
			const productIndex = state.bebidas.findIndex(item => item._id === action.payload._id);
			if (state.bebidas[productIndex].cantidad > 1) {
				state.bebidas[productIndex].cantidad -= 1;
			} else if (state.bebidas[productIndex].cantidad === 1) {
				const newList = state.bebidas.filter(item => item._id !== action.payload._id);
				state.bebidas = newList;
			}
		},
		addPostresPromo: (state, action) => {
			const productIndex = state.postres.findIndex(item => item._id === action.payload._id);
			if (productIndex >= 0) {
				state.postres[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.postres.push(tempProduct);
			}
		},
		decrementPostresPromo: (state, action) => {
			const productIndex = state.postres.findIndex(item => item._id === action.payload._id);
			if (state.postres[productIndex].cantidad > 1) {
				state.postres[productIndex].cantidad -= 1;
			} else if (state.postres[productIndex].cantidad === 1) {
				const newList = state.postres.filter(item => item._id !== action.payload._id);
				state.postres = newList;
			}
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
		addProductDirect: (state, action) => {
			const productIndex = state.orderList.findIndex(item => item._id === action.payload._id);
			if (productIndex >= 0) {
				state.orderList[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.orderList.push(tempProduct);
			}
		},
		decrementProductDirect: (state, action) => {
			const productIndex = state.orderList.findIndex(item => item._id === action.payload._id);
			if (state.orderList[productIndex].cantidad > 1) {
				state.orderList[productIndex].cantidad -= 1;
			} else if (state.orderList[productIndex].cantidad === 1) {
				const newList = state.orderList.filter(item => item._id !== action.payload._id);
				state.orderList = newList;
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
		clearDrinks: (state, action) => {
			state.bebidas = [];
		},
		clearPostres: (state, action) => {
			state.postres = [];
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
	addDrinksPromo,
	decrementDrinksPromo,
	addPostresPromo,
	decrementPostresPromo,
	addProductPromo,
	setQuantityDemandedDrinks,
	setQuantityDemandedPostres,
	decrementProductPromo,
	decrementProductPizza,
	removeProduct,
	setDemora,
	clearDrinks,
	clearPostres,
	calculateSubTotal,
	calculateTotalQuantity,
	addPromoOrderList,
	setOrderListLocal,
	addProductDirect,
	decrementProductDirect,
	clearOrderPromo,
	setQuantityDemanded,
	setCheckout,
	setDelivery,
	removeItemCart,
	clearOrderList,
	setTotalAmount
} = orderSlice.actions;

export default orderSlice.reducer;
