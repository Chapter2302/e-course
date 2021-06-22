import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import cart from "./cart"
import filter from "./filter"
import sort from "./sort"
import chat from "./chat"
import language from "./language"

const reducer = combineReducers({
  cart,
  filter,
  sort,
  chat,
  language
})

const store = configureStore({
  reducer,
})

export default store