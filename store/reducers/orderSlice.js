import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listaProductos: [],
  cantProductos: 0,
  cuentaTotal: 0
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductList: (state, action) => {
      state.listaProductos = [...state.listaProductos, action.payload]
      state.cantProductos += 1
      state.cuentaTotal = 0
    },
    removeProductList: (state) => {
      const productId = action.payload
      state.cantProductos -= 1
      state.listaProductos = state.listaProductos.filter(product => product.id !== productId)
    },
    incrementProductCount: (state, action) => {
      state.value += action.payload
    },
    decrementProductCount: (state, action) => {
      state.value -= action.payload
    },
    setTotalCount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, incrementProductCount, decrementProductCount } = orderSlice.actions

export default orderSlice.reducer