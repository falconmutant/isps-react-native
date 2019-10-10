import {actionTypes as auth} from './reducers/auth'
import {actionTypes as contact} from './reducers/contact'
import {actionTypes as event} from './reducers/event'
import {actionTypes as catalog} from './reducers/catalog'
import {actionTypes as uptake} from './reducers/uptake'

export const url = (target) => `https://dev.isps.mx/${target}`;

export const months = ['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const actionsReducers = {
    ...auth,
    ...contact,
    ...event,
    ...catalog,
    ...uptake,
};

export const MayaQuery = (props) => {
    const {target, token, data} = props;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : null,
    };
    return fetch(url(target), {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then((response) => {
        try{
            if(data.action !== 'logout') return response.json();
        }catch(e){
            return { error: 'Fallo fetch', response }
        }
        
    })
};

export const MediaMayaQuery = ({token, data}) => {
    console.log('entra a MayaQuery', token, data);
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Token ${token}` : null,
    };
    console.log('Listo Headers', headers);
    return fetch(url('files/'), {
        method: 'POST',
        headers,
        body: data
    }).then((response) => {
        console.log('Message mayaquery media', response);
        try{
            console.log('Message mayaquery media', response.json);
            return response.json()
        }catch(e){
            console.log(response);
            return { error: 'Fallo fetch', response }
        }
        
    })
};

export const Files = {
    avatar: './assets/images/avatar.png',
    catalog: require('./assets/images/catalog.png'),
    event: require('./assets/images/event.png'),
    logo: require('./assets/images/logo.png'),
    phone: require('./assets/images/phone.png'),
    signIn: './assets/images/signin_background.png',
    signUp: './assets/images/signup_background.jpeg',
    splash: require('./assets/videos/splash_isps.mp4'),
}
