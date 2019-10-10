import { Alert } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery } from '../constants'

const getAuth = (state) => state.auth;

export function* CatalogsDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(CatalogsApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_CATALOGS, payload: response });
    }
}

export function* SaveCatalogDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveCatalogApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_CATALOG, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Catalogs' }));
    }
}

export function* ProductsDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(ProductsApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_PRODUCTS, payload: response });
    }
}

export function* SaveProductDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveProductApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_PRODUCT, payload: response });
    }
}

const SaveCatalogApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'productcatalog',
            action: 'add',
            model: {
                ...data
            }
        }
    });
};

const CatalogsApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'productcatalog',
            action: 'get',
            model: {
                search: {
                    user_id: user.id
                }
            }
        }
    });
};

const SaveProductApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'product',
            action: 'add',
            model: {
                ...data
            }
        }
    });
};

const ProductsApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'product',
            action: 'get',
            model: {
                search: {
                    user_id: user.id
                }
            }
        }
    });
};