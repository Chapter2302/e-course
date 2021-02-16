import { combineReducers } from "redux"
import authReducer from "./auth"
import filterReducer from "./filter"

const reducer = combineReducers({
    auth: authReducer,
    filter: filterReducer
})

export default reducer