import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"

import Card from './Card'
import Search from './Search'



const actions = [
    {
        text: "Nuevo",
        icon: require("../../../assets/images/event.png"),
        name: "bt_new",
        position: 2
    },
    {
        text: "Importar",
        icon: require("../../../assets/images/catalog.png"),
        name: "bt_import",
        position: 1
    }
];

class Contacts extends Component {

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getContacts();
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    renderSearch = () => <Search {...this.props} />;

    renderCards = () => <Card {...this.props} />;

    render() {
        const {navigation, addContact} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} search title="Contactos" navigation={navigation} renderSearch={this.renderSearch()} />
                {this.renderCards()}
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        (name === 'bt_new') ? addContact() : navigation.navigate({ routeName: 'ImportContact' });
                    }}
                />
            </Block>
        );
    }
}


const mapStateToProps = state => ({
    contacts: state.contact.contacts,
});

const mapDispatchToProps = dispatch => ({
    getContacts: () => {
        dispatch({ type: actionsReducers.GET_CONTACTS });
    },
    addContact: () => {
        dispatch({ type: actionsReducers.NEW_CONTACT });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);