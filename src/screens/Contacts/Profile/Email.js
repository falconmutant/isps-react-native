import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import {Screen, Card, Icon, Input, Dialog, styles, width, COLORS, SIZES, actionsReducers } from '../../../layout'


class Email extends Component {
    constructor(props){
        super(props);
        this.contact = props.navigation.getParam('contact', 'No contact');
        this.state = {
            actions: [
                {
                    text: "Nuevo",
                    icon: require("../../../assets/images/event.png"),
                    name: "bt_new",
                    position: 1
                },
            ],
            emails: this.contact.profile_email,
            visible: false,
            email: '',
        }
    }

    onCancel = () => {
        this.setState({
            visible: false,
            email: '',
        })
    };

    onConfirm = () => {
        const {emails, email} = this.state;
        emails.push({ emailAddress: email });
        this.setState({
            visible: false,
            email: '',
            emails,
        });
        this.props.changeProfile({
            id: this.contact.id,
            profile_email: emails,
        });
    }

    onDelete(pos) {
        const {emails} = this.state;
        this.setState({ emails: emails.splice(pos, emails.length) });
        this.props.changeProfile({
            id: this.contact.id,
            profile_email: emails.splice(pos, phones.length),
        });
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ emails: this.contact.profile_email });
        } else {
            const {emails} = this.contact.profile_email;
            const matching = [];
            emails.map(email =>{
                if(email.emailAddress.indexOf(text) >= 0) matching.push(email);
            });
            this.setState({ emails: matching });
        }
    }
    
    render() {
        const {navigation} = this.props;
        const {actions, emails, visible, email} = this.state;
        return (
            <Screen
            back
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar correo'
            title="Correos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={name => name === 'bt_new' ? this.setState({visible: !visible}) : null}>
                {emails.map((email, i) => (
                    <Card
                        key={i}
                        flex
                        borderless
                        shadowColor={COLORS.BLACK}
                        style={styles.card}
                        title={email.emailAddress}
                        location={
                            <TouchableOpacity onPress={() => this.Delete(i)}>
                                <Icon name="trash" family="font-awesome" style={{ paddingRight: 5 }} />
                            </TouchableOpacity>
                        }
                        caption={<Icon name="envelope" family="font-awesome" style={{ paddingRight: 5 }} />}
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                    />
                ))}
                <Dialog 
                    visible={visible}
                    title='Nuevo correo'
                    subtitle='Ingresa correo.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'correo electronico'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({email: e})}
                        value={email}
                    />
                </Dialog>
            </Screen>
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
