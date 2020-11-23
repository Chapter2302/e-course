import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import cart from "./cart"
import filter from "./filter"
import sort from "./sort"

const reducer = combineReducers({
  cart,
  filter,
  sort
})

const store = configureStore({
  reducer,
})

export default store