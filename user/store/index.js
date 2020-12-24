import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import cart from "./cart"
import filter from "./filter"
import sort from "./sort"
import language from "./language"

const reducer = combineReducers({
  cart,
  filter,
  sort,
  language
})

const store = configureStore({
  reducer,
})

export default store