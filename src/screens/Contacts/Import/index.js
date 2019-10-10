import React, { Component } from 'react'
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux'

import ListItem from './ListItem'
import Avatar from './Avatar'

import { Screen, Radio, styles, COLORS, actionsReducers } from '../../../layout'


const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return null;
    }
    return null;
};


class Import extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            contacts: [],
            visible: false,
        };
    }

    async componentWillMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contactos",
                message: "Esta aplicación quiere acceder a tus contactos"
            }).then(() => {
                this.loadContacts();
            });
        } else {
            this.loadContacts();
        }
    }

    loadContacts() {
        Contacts.getAll((err, contacts) => {
            if (err === "denied") {
                console.warn("Permiso denegado");
            } else {
                this.setState({ contacts });
            }
        });
    }

    search(text) {
        const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        if (text === "" || text === null) {
            this.loadContacts();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
            this.setState({ contacts });
            });
        } else {
            Contacts.getContactsMatchingString(text, (err, contacts) => {
            this.setState({ contacts });
            });
        }
    }

    onImport = (contact) => {
        console.log(contact)
        const phones = [];
        contact.phoneNumbers.map(phone => {
            const number = phone.number.replace(/ /g, "").replace("+521", "");
            const type = phone.label.toUpperCase();
            phones.push({
                areaCode: number.substring(0, 3),
                phoneNumber: number.substring(3, 10),
                phoneType: type,
            })
        });

        this.props.saveImport({
            fullName: `${contact.givenName} ${contact.familyName !== 'undefined' ? connect.familyName : ''}`,
            phone: phones,
        })
        this.setState(
            {
              visible: true,
            },
            () => {
              this.hideToast();
            },
        );
    }

    hideToast = () => {
        this.setState({
          visible: false,
        });
    };

    render() {
        const {navigation} = this.props;
        const {contacts} = this.state;
        return (
            <Screen
            back
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar contacto'
            title="Importar Contacto"
            navigation={navigation}>
                {contacts.map(contact => {
                    return(
                        <ListItem
                            leftElement={
                                <Avatar
                                    img={
                                    contact.hasThumbnail
                                        ? { uri: contact.thumbnailPath }
                                        : require("../../../assets/images/avatar.png")
                                    }
                                    width={40}
                                    height={40}
                                />
                            }
                            key={contact.recordID}
                            title={`${contact.givenName} ${contact.familyName ? contact.familyName : ''}`}
                            description={`${contact.company}`}
                            rightElement={<Radio
                                label=''
                                color={COLORS.BLUE}
                                initialValue={false}
                                onChange={() => this.onImport(contact)}
                            />}
                        />
                    )
                })}
                <Toast visible={this.state.visible} message="Contacto Importado" />
            </Screen>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveImport: (contact) => {
        dispatch({
            type: actionsReducers.NEW_CONTACT,
            payload: contact,
        });
    },
});

export default connect(null, mapDispatchToProps)(Import);