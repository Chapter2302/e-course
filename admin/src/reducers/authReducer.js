import { LOGIN, LOGOUT } from '../constants'

const initialState = {
    authenticated: false,
    session: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case LOGIN: {
            return {
                ...state,
                authenticated: true,
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