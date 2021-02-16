import { LOGIN, LOGOUT } from '../constants'

const initialState = {
    isAuth: false,
    session: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN: {
            return {
                ...state,
                isAuth: true,
                session: action.session           
            }
        }
        case LOGOUT: {
            return {...initialState}
        }
        default: 
            return state
    }
}

export default authReducer