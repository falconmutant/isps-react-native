export const actionTypes = {
    SAVE_EVENT: 'SAVE_EVENT',
    ADD_EVENT: 'ADD_EVENT',
    GET_EVENTS: 'GET_EVENTS',
    SET_EVENTS: 'SET_EVENTS',
    SAVE_CATEGORY: 'SAVE_CATEGORY',
    ADD_CATEGORY: 'ADD_CATEGORY',
    GET_CATEGORIES: 'GET_CATEGORIES',
    SET_CATEGORIES: 'SET_CATEGORIES',
    
};

const initialState = {
    events: [],
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_EVENTS:
            return {
                ...state,
                events: action.payload,
            };
        case actionTypes.ADD_EVENT:
            state.events.push(action.payload);
            return {
                ...state,
            };
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case actionTypes.ADD_CATEGORY:
            state.categories.push(action.payload);
            return {
                ...state,
            };
        default:
            return state;
    }
}