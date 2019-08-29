export const actionTypes = {
    SAVE_CONTACT: 'SAVE_CONTACT',
    ADD_CONTACT: 'ADD_CONTACT',
    GET_CONTACTS: 'GET_CONTACTS',
    SET_CONTACTS: 'SET_CONTACTS',
    SAVE_CONTACT_IMPORT: 'SAVE_CONTACT_IMPORT',
    SAVE_PROFILE_PICTURE_CONTACT: 'SAVE_PROFILE_PICTURE_CONTACT',
    MODIFY_PROFILE_CONTACT: 'MODIFY_PROFILE_CONTACT',
};


const initialState = {
    contacts: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
            };
        case actionTypes.ADD_CONTACT:
            state.contacts.push(action.payload);
            return {
                ...state,
            };
        default:
            return state;
    }
}