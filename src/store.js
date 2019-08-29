import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'
import loggerMiddleware from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistCombineReducers } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import Reducers from './reducers'
import DarwinSagas from './middleware'
import AppNavigator from './navigation'

//init Persist store
const rootReducer = persistCombineReducers({
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'],
}, Reducers);

//create middleware saga
const SagaMiddleware = createSagaMiddleware();
//create state persist navigation
const NavMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

//create redux container navigation and create state navigation
const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
    state: state.nav,
});

export const AppWithNavigationState = connect(mapStateToProps)(App);

//create store
const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(loggerMiddleware, SagaMiddleware, NavMiddleware)),
);

const persistor = persistStore(Store);

SagaMiddleware.run(DarwinSagas);

const getPersistor = () => persistor;
const getStore = () => Store;
const getState = () => Store.getState();

export {
    getStore,
    getState,
    getPersistor
}