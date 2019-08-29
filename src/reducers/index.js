import auth from './auth'
import contact from './contact'
import event from './event'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import { reducer as form } from 'redux-form'
import AppNavigator from '../navigation'

const navReducer = createNavigationReducer(AppNavigator);

export default {
    nav: navReducer,
    form,
    auth,
    contact,
    event,
};