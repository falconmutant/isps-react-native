import {actionTypes as auth} from './reducers/auth'
import {actionTypes as contact} from './reducers/contact'
import {actionTypes as event} from './reducers/event'


export const url = (target) => `https://dev.isps.mx/${target}`;

export const actionsReducers = {
    ...auth,
    ...contact,
    ...event,
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

export const MediaMayaQuery = (props) => {
    console.log('entra', props);
    const {target, token, data} = props;
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: token ? `Token ${token}` : null,
    };
    return fetch(url(target), {
        method: 'POST',
        headers,
        body: data
    }).then((response) => {
        console.log(response.text);
        try{
            return response.json()
        }catch(e){
            console.log(response);
            return { error: 'Fallo fetch', response }
        }
        
    })
};
