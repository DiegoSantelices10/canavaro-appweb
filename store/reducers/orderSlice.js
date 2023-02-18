import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderList: [],
	orderPromo: [],
	promoCompleted: false,
	quantityDemanded: 0,
	totalQuantity: 0,
	totalAmount: 0,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setQuantityDemanded: (state, action) => {
			state.quantityDemanded = action.payload;
		},
		completedPromo: (state, action) => {},
		addProductPizza: (state, action) => {
			if (action.payload.categoria == 'pizzas') {
				const productIndex = state.orderList.findIndex(item => item.tamanio === action.payload.tamanio);
				productIndex >= 0
					? (state.orderList[productIndex].cantidad += 1)
					: state.orderList.push({ ...action.payload, cantidad: 1 });
			}
		},
		addProductEmpanada: (state, action) => {
			const productIndex = state.orderList.findIndex(item => item.id === action.payload.id);
			if (productIndex >= 0) {
				state.orderList[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.orderList.push(tempProduct);
			}
		},
		addPromoOrderList: (state, action) => {
			console.log('redux', action.payload);
			state.orderList.push(action.payload);
		},

		addProductPromo: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item.id === action.payload.id);
			if (productIndex >= 0) {
				state.orderPromo[productIndex].cantidad += 1;
			} else {
				const tempProduct = { ...action.payload, cantidad: 1 };
				state.orderPromo.push(tempProduct);
			}
		},
		decrementProductPromo: (state, action) => {
			const productIndex = state.orderPromo.findIndex(item => item.id === action.payload.id);
			if (state.orderPromo[productIndex].cantidad > 1) {
				state.orderPromo[productIndex].cantidad -= 1;
			} else if (state.orderPromo[productIndex].cantidad === 1) {
				const newList = state.orderPromo.filter(item => item.id !== action.payload.id);
				state.orderPromo = newList;
			}
		},
		decrementProduct: (state, action) => {
			const productIndex = state.orderList.findIndex(item => item.id === action.payload.id);
			if (state.orderList[productIndex].cantidad > 1) {
				state.orderList[productIndex].cantidad -= 1;
			} else if (state.orderList[productIndex].cantidad === 1) {
				const newList = state.orderList.filter(item => item.id !== action.payload.id);
				state.orderList = newList;
			}
		},
		clearOrderPromo: (state, action) => {
			state.orderPromo = [];
		},
		removeProduct: (state, action) => {
			state.orderList = state.orderList.filter(product => product.id !== action.payload.id);
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
	},
});

// Action creators are generated for each case reducer function
export const {
	addProductPizza,
	addProductEmpanada,
	addProductPromo,
	decrementProductPromo,
	decrementProduct,
	removeProduct,
	calculateSubTotal,
	calculateTotalQuantity,
	addPromoOrderList,
	clearOrderPromo,
	completedPromo,
	setQuantityDemanded,
} = orderSlice.actions;

export const selectOrder = state => state.order;
export const selectOrderList = state => state.orderList;
export const selectTotalQuantity = state => state.totalQuantity;
export const selectTotalAmount = state => state.totalAmount;
export default orderSlice.reducer;
