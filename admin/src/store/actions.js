import { 
    GET_ALL, 
    UPDATE_TABLE_ITEMS,
    UPDATE_PAGES, 
    UPDATE_ENTRIES, 
    UPDATE_SEARCH_FILTER, 
    UPDATE_SORT,
    UPDATE_FILTER,
    LOGIN, 
    LOGOUT
} from  'constants'

import { 
    getAll,
    localLogin
} from "api"

const login = (email, password) => async dispatch => {
    const res = await localLogin(email, password)
    const session = await res.json()
    localStorage.setItem("session", JSON.stringify(session))
    dispatch({
        type: LOGIN,
        session
    })
}

const logout = () => async dispatch => {
    localStorage.removeItem("session")
    dispatch({
        type: LOGOUT
    })
    window.location.href = "/"
}

const getAllData = (collection) => async dispatch => {
    const listItems = await getAll(collection)
    dispatch({
        type: GET_ALL,
        collection,
        listItems
    })
}

const updateTableItems = (tableItems) => {
    return { 
        type: UPDATE_TABLE_ITEMS,
        tableItems,
    }
}

const updateSearchFilter = (search) => ({ 
    type: UPDATE_SEARCH_FILTER,
    search,
})

const updateSort = (sort) => ({ 
    type: UPDATE_SORT,
    sort,
})

const updateFilter = (filter) => ({ 
    type: UPDATE_FILTER,
    filter,
})

const updateEntries = (entries) => ({ 
    type: UPDATE_ENTRIES,
    entries,
})

const updatePage = (page) => ({ 
    type: UPDATE_PAGES,
    page,
})

export { 
    getAllData, 
    updateTableItems,
    updateEntries, 
    updatePage, 
    updateSort,
    updateFilter,
    updateSearchFilter, 
    login, 
    logout 
}