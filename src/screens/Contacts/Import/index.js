import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

import Card from './Card'
import Search from './Search'


class Import extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state = {
            contacts: []
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

    renderSearch = () => <Search onChangeText={this.search} {...this.props} />;

    renderCards = () => <Card contacts={this.state.contacts} {...this.props} />;

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header back style={styles.header} search title="Importar" navigation={navigation} renderSearch={this.renderSearch()} />
                {this.renderCards()}
            </Block>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    saveImport: (contact) => {
        dispatch({ type: actionsReducers.SAVE_CONTACT_IMPORT });
    },
});

export default connect(null, mapDispatchToProps)(Import);