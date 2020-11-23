import { 
    GET_ALL, 
    UPDATE_TABLE_ITEMS,
    UPDATE_ENTRIES, 
    UPDATE_PAGES, 
    UPDATE_SEARCH, 
    UPDATE_SORT 
} from '../constants'

const initialState = {
    collection: "null",
    listItems: [],
    tableItems: [],
    entries: 10,
    page: 1,
    sort: ""
}

const tableReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL: {
            return {
                ...state,
                collection: action.collection,
                listItems: action.listItems,
                tableItems: action.listItems,
                entries: 10,
                page: 1,
                sort: ""       
            }
        }  
        case UPDATE_TABLE_ITEMS: {
            return {
                ...state,
                tableItems: action.tableItems,
                entries: 10,
                page: 1,         
            }
        }
        case UPDATE_ENTRIES: {
            return {
                ...state,
                entries: action.entries          
            }
        }  
        case UPDATE_PAGES: {
            return {
                ...state,
                page: action.page          
            }
        }
        case UPDATE_SORT: {
            return {
                ...state,
                sort: action.sort
            }
        }
        default: return state
    }
}

export default tableReducer