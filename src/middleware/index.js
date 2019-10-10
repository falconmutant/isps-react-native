import { takeLatest, fork } from 'redux-saga/effects';
import { actionsReducers } from '../constants'
import * as auth from './auth'
import * as contact from './contact'
import * as event from './event'
import * as catalog from './catalog'
import * as uptake from './uptake'


function* Darwin(){
    yield takeLatest(actionsReducers.LOGIN, auth.LoginDarwin);
    yield takeLatest(actionsReducers.REGISTER, auth.RegisterDarwin);
    yield takeLatest(actionsReducers.LOGOUT, auth.LogoutDarwin);
    yield takeLatest(actionsReducers.VALIDATE, auth.ValidateAuthDarwin);
    yield takeLatest(actionsReducers.GET_CONTACTS, contact.ContactsDarwin);
    yield takeLatest(actionsReducers.NEW_CONTACT, contact.NewContactDarwin);
    yield takeLatest(actionsReducers.SAVE_PROFILE_PICTURE_CONTACT, contact.PPContactDarwin);
    yield takeLatest(actionsReducers.MODIFY_PROFILE_CONTACT, contact.ModifyContactDarwin);
    yield takeLatest(actionsReducers.GET_EVENTS, event.EventsDarwin);
    yield takeLatest(actionsReducers.SAVE_EVENT, event.SaveEventDarwin);
    yield takeLatest(actionsReducers.GET_CATEGORIES, event.CategoriesDarwin);
    yield takeLatest(actionsReducers.SAVE_CATEGORY, event.SaveCategoryDarwin);
    yield takeLatest(actionsReducers.GET_CATALOGS, catalog.CatalogsDarwin);
    yield takeLatest(actionsReducers.SAVE_CATALOG, catalog.SaveCatalogDarwin);
    yield takeLatest(actionsReducers.GET_PRODUCTS, catalog.ProductsDarwin);
    yield takeLatest(actionsReducers.SAVE_PRODUCT, catalog.SaveProductDarwin);
    yield takeLatest(actionsReducers.GET_UPTAKES, uptake.UptakesDarwin);
    yield takeLatest(actionsReducers.SAVE_UPTAKE, uptake.SaveUptakeDarwin);
}

export default function* startDarwin(){
    yield fork(Darwin);
}

