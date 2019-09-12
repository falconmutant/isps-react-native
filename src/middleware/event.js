import React from 'react'
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

const EventsApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'event',
            action: 'get',
            model: {
                search: {
                    user: user.id
                }
            }
        }
    });
};