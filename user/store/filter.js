import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    category: "", 
    shift: "", 
    dayInWeek: "", 
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
    _setShiftFilter: (state, action) => {
        state.shift = action.payload 
    },
    _setDayInWeekFilter: (state, action) => {
        state.dayInWeek = action.payload 
    },
    _setMinPriceFilter: (state, action) => {
        state.minPrice = action.payload 
    },
    _setMaxPriceFilter: (state, action) => {
        state.maxPrice = action.payload 
    },
    setFilter: (state, action) => {
        //console.log(action.payload)
        return action.payload
    }
  }
})

export const { 
    _setSearchFilter,
    _setCategoryFilter,
    _setDayInWeekFilter,
    _setMinPriceFilter,
    _setMaxPriceFilter,
    _setShiftFilter,
    setFilter
 } = slice.actions

export default slice.reducer
