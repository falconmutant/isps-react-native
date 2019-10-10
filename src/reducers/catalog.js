export const actionTypes = {
    SAVE_CATALOG: 'SAVE_CATALOG',
    ADD_CATALOG: 'ADD_CATALOG',
    GET_CATALOGS: 'GET_CATALOGS',
    SET_CATALOGS: 'SET_CATALOGS',
    SAVE_PRODUCT: 'SAVE_PRODUCT',
    ADD_PRODUCT: 'ADD_PRODUCT',
    GET_PRODUCTS: 'GET_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    
};

const initialState = {
    catalogs: [],
    products: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CATALOGS:
            return {
                ...state,
                catalogs: action.payload,
            };
        case actionTypes.ADD_CATALOG:
            state.catalogs.push(action.payload);
            return {
                ...state,
            };
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case actionTypes.ADD_PRODUCT:
            state.products.push(action.payload);
            return {
                ...state,
            };
        default:
            return state;
    }
}