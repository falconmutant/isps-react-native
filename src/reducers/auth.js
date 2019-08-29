export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISTER: 'REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    VALIDATE_AUTH: 'VALIDATE_AUTH',
    AUTH_ERROR: 'AUTH_ERROR',
    CHECK_SESSION: 'CHECK_SESSION',
    CREATE_SESSION: 'CREATE_SESSION',
    DELETE_SESSION: 'DELETE_SESSION',
};

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    profile: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                ...action.payload,
            };
        case actionTypes.LOGIN_FAIL:
        case actionTypes.REGISTER_FAIL:
        case actionTypes.AUTH_ERROR:
        case actionTypes.LOGOUT_SUCCESS:
        case actionTypes.DELETE_SESSION:
            return {
                ...state,
                isAuthenticated: false,
            };
        case actionTypes.CREATE_SESSION:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case actionTypes.CHECK_SESSION:
        default:
            return state;
    }
}