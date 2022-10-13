import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderList: [],
  totalQuantity: 0,
  totalAmount: 0
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductList: (state, action) => {
      const productIndex = state.orderList.findIndex(
                           (item) => item.id === action.payload.id)
      
          if(productIndex >= 0) {
            state.orderList[productIndex].cantidad += 1
          } else {
            const tempProduct = { ...action.payload, cantidad: 1 }
            state.orderList.push(tempProduct)
          }
    },
    
    decreaseProductList: (state, action) => {
      const productIndex = state.orderList.findIndex(
                           (item) => item.id === action.payload.id)
      
      if(state.orderList[productIndex].cantidad > 1) {
        state.orderList[productIndex].cantidad -= 1
      } else if (state.orderList[productIndex].cantidad === 1) {
        const newList = state.orderList.filter(
                        (item) => item.id !== action.payload.id)

        state.orderList = newList                
      }
    },

    removeProductList: (state, action) => {
      state.orderList = state.orderList.filter(
                             product => product.id !== action.payload.id)
    },
    
    calculateSubTotal: (state, action) => {
      const array = []
      state.orderList.map((item) => {
        const { precio, cantidad } = item
        const listItemAmount = precio * cantidad
        return array.push(listItemAmount)
      })

      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalAmount = totalAmount
    },

    calculateTotalQuantity: (state, action) => {
      const array = []
      state.orderList.map((item) => {
        const { cantidad } = item
        return array.push(cantidad)
      })
      const totalQuantity = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalQuantity = totalQuantity
    }

  },
})

// Action creators are generated for each case reducer function
export const { 
  addProductList, 
  removeProductList, 
  decreaseProductList, 
  calculateSubTotal, 
  calculateTotalQuantity 
} = orderSlice.actions

export const selectOrderist = (state) => state.order.orderList
export const selectTotalQuantity = (state) => state.order.totalQuantity
export const selectTotalAmount = (state) => state.order.totalAmount
export default orderSlice.reducer