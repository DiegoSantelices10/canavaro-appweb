import { configureStore } from '@reduxjs/toolkit'
import  orderReducer  from 'store/reducers/orderSlice'


export const store = configureStore({
  reducer: {
    order: orderReducer
  },
})