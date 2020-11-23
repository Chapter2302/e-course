import { 
    UPDATE_FILTER, 
    UPDATE_SEARCH_FILTER
} from '../constants'

const initialState = {
    search: "",
    userRole: "",
    userGender: "",
    courseDayInWeek: "",
    courseShift: "",
    courseCategory: "",
    courseStatus: "",
    transStatus: "",
    transMonth: "",
    transYear: ""
}

const filterReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_SEARCH_FILTER: {
            return {
                ...state,
                search: action.search
            }
        }
        case UPDATE_FILTER: {
            console.log(action.filter)
            return {
                ...state,
                userRole: action.filter.userRole,
                userGender: action.filter.userGender,
                courseDayInWeek: action.filter.courseDayInWeek,
                courseShift: action.filter.courseShift,
                courseCategory: action.filter.courseCategory,
                courseStatus: action.filter.courseStatus,
                transStatus: action.filter.transStatus
            }
        }
        default: return state
    }
}

export default filterReducer