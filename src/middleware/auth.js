import React from 'react'
import { Alert } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery } from '../constants'
import {reset} from 'redux-form';

const getToken = (state) => state.auth.token;

export function* LoginDarwin(data){
    const response = yield call(loginApi, data.payload);
    yield put(reset('SignInForm'));
    if(!response.hasOwnProperty('MayaMessage')){
        yield put({ type: actionsReducers.LOGIN_SUCCESS, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Home2' }));
    }else{
        yield put({ type: actionsReducers.LOGIN_FAIL });
        Alert.alert(response.MayaMessage);
    }

}

export function* RegisterDarwin(data){
    const response = yield call(registerApi, data.payload);
    if(!response.hasOwnProperty('MayaMessage')){
        yield put(reset('SignUpForm'));
        yield put({ type: actionsReducers.REGISTER_SUCCESS, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Home2' }));
    }else{
        yield put({ type: actionsReducers.REGISTER_FAIL });
        Alert.alert(response.MayaMessage);
    }

}

export function* LogoutDarwin(){
    const token = yield select(getToken);
    const response = yield call(logoutApi, token);
    yield put({ type: actionsReducers.LOGOUT_SUCCESS });
    yield put(NavigationActions.navigate({ routeName: 'Auth' }));
}

export function* ValidateAuthDarwin(){
    const token = yield select(getToken);
    const response = yield call(validateAuthApi, token);
    if(response.hasOwnProperty('username')){
        yield put({ type: actionsReducers.CREATE_SESSION, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Home2' }));
    } else {
        yield put({ type: actionsReducers.DELETE_SESSION });
        yield put(NavigationActions.navigate({ routeName: 'Auth' }));
    }
}

const loginApi = (values) => {
    return MayaQuery({
        target: 'auth/login/',
        data: {
            target: 'auth',
            action: 'login',
            model: {
                ...values
            }
        }
    });
};

const registerApi = (values) => {
    return MayaQuery({
        target: 'auth/register/',
        data: {
            target: 'auth',
            action: 'register',
            model: {
                ...values,
                isContact: false,
                score: 0.0
            }
        }
    });
};

const logoutApi = (token) => {
    return MayaQuery({
        target: 'auth/logout/',
        token: token,
        data: {
            target: 'auth',
            action: 'logout',
            model: {}
        }
    });
};

const validateAuthApi = (token) => {
    return MayaQuery({
        target: 'api/',
        token: token,
        data: {
            target: 'user',
            action: 'login actual',
            model: {}
        }
    });
};