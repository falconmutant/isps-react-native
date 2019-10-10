import React, { Component } from 'react'
import { TouchableOpacity, Text} from "react-native";
import { connect } from 'react-redux'
import Moment from 'react-moment';
import 'moment/locale/es'

import {Screen, Card, styles, COLORS, SIZES, actionsReducers, url} from '../../layout'


class ContactsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            actions: [
                {
                    text: "Nuevo",
                    icon: require('../../assets/images/event.png'),
                    name: "new",
                    position: 2
                },
                {
                    text: "Importar",
                    icon: require('../../assets/images/catalog.png'),
                    name: "import",
                    position: 1
                }
            ],
            contacts: [],
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getContacts();
                this.setState({ contacts: this.props.contacts });
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({contacts: nextProps.contacts});
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ contacts: this.props.contacts });
        } else {
            const {contacts} = this.props;
            const matching = [];
            contacts.map(contact =>{
                if(contact.fullName.indexOf(text) >= 0) matching.push(contact)
            });
            this.setState({ contacts: matching });
        }
    }

    onPress = name => {
        const {navigation, addContact} = this.props;
        (name === 'new') ? addContact() : navigation.navigate('ImportContact');
    }

    render() {
        const {navigation} = this.props;
        const {contacts, actions} = this.state;
        const removeFilter = (d) => {
            if(d.split(" ").length > 0) return `${d.split(" ")[1]} ${d.split(" ")[2]}`;
            return ""
        };
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar contacto'
            title="Contactos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {contacts.map((contact, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Profile', {contact})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            footer={true}
                            title={contact.fullName}
                            caption={<Moment element={Text} filter={removeFilter} locale='es' toNow>{new Date(contact.doBirth)}</Moment>}
                            location={contact.clientStatus}
                            avatar={contact.image ? {uri: url(contact.image.image)} : require('../../assets/images/avatar.png')}
                            imageStyle={styles.cardImageRadius}
                            imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                        />
                    </TouchableOpacity>
                ))}
            </Screen>
        )
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
        dispatch({ type: actionsReducers.NEW_CONTACT, payload: {} });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
