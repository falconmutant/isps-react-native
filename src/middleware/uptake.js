import { Alert } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery } from '../constants'

const getAuth = (state) => state.auth;

export function* UptakesDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(UptakesApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_UPTAKES, payload: response });
    }
}

export function* SaveUptakeDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveUptakeApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_UPTAKE, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Uptakes' }));
    }
}


const SaveUptakeApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'uptake',
            action: 'add',
            model: {
                ...data
            }
        }
    });
};

const UptakesApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'uptake',
            action: 'get',
            model: {
                search: {
                    user_id: user.id
                }
            }
        }
    });
};