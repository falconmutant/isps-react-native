import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"
import Dialog from 'react-native-dialog'

import Card from './components/Email/Card'

const actions = [
    {
        text: "Nuevo",
        icon: require("../../../assets/images/event.png"),
        name: "bt_new",
        position: 2
    },
];

class Email extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            visible: false,
            email: '',
            contact: this.props.navigation.getParam('contact', 'No contact'),
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.renderCards();
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    renderCards = () => <Card contact={this.state.contact} {...this.props} />;

    Cancel = () => {
        this.setState({
            visible: false,
            email: '',
        })
    };

    Press = () => {
        const {contact} = this.state;
        contact.profile_email.push({
            emailAddress: this.state.email,
        });
        this.setState({
            visible: false,
            email: '',
        });
        this.props.changeProfile({
            id: contact.id,
            profile_email: contact.profile_email,
        });
    }
    
    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} back title="" navigation={navigation} />
                {this.renderCards()}
                <FloatingAction
                    actions={actions}
                    onPressItem={ name => (name === 'bt_new') ? this.setState({visible: true}): {}}
                />
                <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>Nuevo correo</Dialog.Title>
                    <Dialog.Description>
                        Ingresa correo.
                    </Dialog.Description>
                    <Dialog.Input placeholder='Correo electronico' onChangeText={(e) => this.setState({email: e})} />
                    <Dialog.Button label="Cancelar" onPress={this.Cancel} />
                    <Dialog.Button label="OK" onPress={this.Press} />
                </Dialog.Container>
            </Block>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeProfile: (data) => {
        dispatch({
            type: actionsReducers.MODIFY_PROFILE_CONTACT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(Email)
