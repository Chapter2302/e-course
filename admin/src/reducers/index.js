import { combineReducers } from "redux"
import authReducer from "./authReducer"
import tableReducer from "./tableReducer"
import filterReducer from "./filterReducer"

const reducer = combineReducers({
    auth: authReducer,
    table: tableReducer,
    filter: filterReducer
})

export default reducer