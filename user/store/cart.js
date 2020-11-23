import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  qty: 0,
  total: 0 
}

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
      state.items = items,
      state.qty = items.length,
      state.total = items.reduce((total, curVal) => { return total + curVal.price }, 0)  
    },
    addToCart: (state, action) => {
      state.items.push(action.payload)
      state.qty += 1
      state.total += action.payload.price
    }
  }
})

export const { setCart, addToCart } = slice.actions

export default slice.reducer