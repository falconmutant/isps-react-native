import React from 'react'
import { Alert } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery } from '../constants'

export function* EventsDarwin(data){
    try {
        const response = yield call(EventsApi, data.payload);
        if('MayaMessage' in response){
            Alert.alert(response.MayaMessage);
        }else{
            yield put({ type: actionsReducers.SET_EVENTS, payload: response });
        }
    } catch (error) {
        put({ type: actionsReducers.LOGIN_FAIL, payload: error });
        yield put(NavigationActions.navigate({ routeName: 'Auth' }));
    }

}

export function* SaveEventDarwin(data){
    const response = yield call(SaveEventsApi, data.payload);
    if('MayaMessage' in response){
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