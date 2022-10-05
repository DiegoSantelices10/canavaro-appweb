import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nombre: "",
  direccion: "",
  telefono: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.nombre = action.payload.nombre,
      state.direccion = action.payload.direccion,
      state.telefono = action.payload.telefono
    },
    unsetUser: (state) => {
        state.nombre = "",
        state.direccion = "",
        state.telefono = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, unsetUser } = userSlice.actions

export default userSlice.reducer