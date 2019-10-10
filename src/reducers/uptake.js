export const actionTypes = {
    SAVE_UPTAKE: 'SAVE_UPTAKE',
    ADD_UPTAKE: 'ADD_UPTAKE',
    GET_UPTAKES: 'GET_UPTAKES',
    SET_UPTAKES: 'SET_UPTAKES',
};

const initialState = {
    uptakes: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_UPTAKES:
            return {
                ...state,
                uptakes: action.payload,
            };
        case actionTypes.ADD_UPTAKE:
            state.uptakes.push(action.payload);
            return {
                ...state,
            };
        default:
            return state;
    }
}