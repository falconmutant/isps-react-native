import { takeLatest, fork } from 'redux-saga/effects';
import { actionsReducers } from '../constants'
import * as auth from './auth'
import * as contact from './contact'
import * as event from './event'


function* Darwin(){
    yield takeLatest(actionsReducers.LOGIN, auth.LoginDarwin);
    yield takeLatest(actionsReducers.REGISTER, auth.RegisterDarwin);
    yield takeLatest(actionsReducers.LOGOUT, auth.LogoutDarwin);
    yield takeLatest(actionsReducers.VALIDATE_AUTH, auth.ValidateAuthDarwin);
    yield takeLatest(actionsReducers.GET_CONTACTS, contact.ContactsDarwin);
    yield takeLatest(actionsReducers.SAVE_CONTACT, contact.SaveContactDarwin);
    yield takeLatest(actionsReducers.SAVE_PROFILE_PICTURE_CONTACT, contact.PPContactDarwin);
    yield takeLatest(actionsReducers.MODIFY_PROFILE_CONTACT, contact.ModifyContactDarwin);
    yield takeLatest(actionsReducers.GET_EVENTS, event.EventsDarwin);
    yield takeLatest(actionsReducers.SAVE_EVENT, event.SaveEventDarwin);
}

export default function* startDarwin(){
    yield fork(Darwin);
}
