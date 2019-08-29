export const actionTypes = {
    SAVE_EVENT: 'SAVE_EVENT',
    ADD_EVENT: 'ADD_EVENT',
    GET_EVENTS: 'GET_EVENTS',
    SET_EVENTS: 'SET_EVENTS',
};

const initialState = {
    events: [],
    catalogs: []
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
        default:
            return state;
    }
}