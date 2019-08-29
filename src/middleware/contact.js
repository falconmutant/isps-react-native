import React from 'react'
import { Alert } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { actionsReducers, MayaQuery, MediaMayaQuery } from '../constants'

const getAuth = (state) => state.auth;

export function* ContactsDarwin(){
    const auth = yield select(getAuth);
    const response = yield call(ContactsApi, {...auth});
    if(response.hasOwnProperty('MayaMessage')){
        console.log(response);
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.SET_CONTACTS, payload: response });
    }
}

export function* SaveContactDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(SaveContactsApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_CONTACT, payload: response });
        yield put(NavigationActions.navigate({ routeName: 'Contacts' }));
    }
}

export function* ModifyContactDarwin(data){
    const auth = yield select(getAuth);
    const response = yield call(ModifyContactsApi, {data: data.payload, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        yield put({ type: actionsReducers.ADD_CONTACT, payload: response });
    }
}

export function* PPContactDarwin(data){
    const auth = yield select(getAuth);
    const form = new FormData();
    form.append('image', data.payload.image);
    const response = yield call(PictureApi, {data: form, ...auth});
    if(response.hasOwnProperty('MayaMessage')){
        Alert.alert(response.MayaMessage);
    }else{
        Alert.alert(response.id);
        const modify = yield call(ModifyContactsApi, {data: {id: data.payload.id, image: response.id}, ...auth});
        yield put({ type: actionsReducers.ADD_CONTACT, payload: modify });
    }
}

const SaveContactsApi = ({data, token, user}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'profile',
            action: 'add',
            model: {
                user: user.id,
                isContact: true,
                ...data
            }
        }
    });
};

const ModifyContactsApi = ({data, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'profile',
            action: 'modify',
            model: {
                ...data
            }
        }
    });
};

const PictureApi = ({data, token}) => {
    return MediaMayaQuery({
        target: 'api/media/',
        token,
        data
    });
};

const ContactsApi = ({user, token}) => {
    return MayaQuery({
        target: 'api/',
        token,
        data: {
            target: 'profile',
            action: 'get',
            model: {
                search: {
                    user: user.id,
                    isContact: true,
                }
            }
        }
    });
};