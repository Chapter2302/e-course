import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    category: "",  
    minPrice: 0, 
    maxPrice: 200
}

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    _setSearchFilter: (state, action) => {
        state.search = action.payload 
    },
    _setCategoryFilter: (state, action) => {
        state.category = action.payload 
    },
    _setMinPriceFilter: (state, action) => {
        state.minPrice = action.payload 
    },
    _setMaxPriceFilter: (state, action) => {
        state.maxPrice = action.payload 
    },
    setFilter: (state, action) => {
        return action.payload
    }
  }
})

export const { 
    _setSearchFilter,
    _setCategoryFilter,
    _setMinPriceFilter,
    _setMaxPriceFilter,
    setFilter
 } = slice.actions

export default slice.reducer
