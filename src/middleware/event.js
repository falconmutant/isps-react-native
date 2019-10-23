import { Alert } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery } from '../constants'

const getAuth = (state) => state.auth;

export function* EventsDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(EventsApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_EVENTS, payload: response });
    }
}

export function* SaveEventDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveEventsApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_EVENT, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Events' }));
    }
}

export function* ModifyEventDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(ModifyEventsApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_EVENT, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Events' }));
    }
}

export function* CategoriesDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(CategoriesApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_CATEGORIES, payload: response });
    }
}

export function* SaveCategoryDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveCategoryApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
        console.log(response);
    }else{
        yield put({ type: actionsReducers.ADD_CATEGORY, payload: response });
    }
}

const SaveEventsApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'event',
            action: 'add',
            model: {
                ...data
            }
        }
    });
};

const ModifyEventsApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'event',
            action: 'modify',
            model: {
                ...data
            }
        }
    });
};

const EventsApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'event',
            action: 'get',
            model: {
                search: {
                    user_id: user.id
                }
            }
        }
    });
};

const SaveCategoryApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'eventcategory',
            action: 'add',
            model: {
                ...data
            }
        }
    });
};

const CategoriesApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'eventcategory',
            action: 'get',
            model: {
                search: {
                    user_id: user.id
                }
            }
        }
    });
};