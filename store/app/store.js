import { configureStore } from '@reduxjs/toolkit'
import  orderReducer  from 'store/reducers/orderSlice'
import userReducer  from 'store/reducers/userSlice'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    user: userReducer
  },
})