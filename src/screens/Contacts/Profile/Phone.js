import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { connect } from 'react-redux'

import {Screen, Card, Icon, Input, Dialog, styles, width, COLORS, SIZES, actionsReducers } from '../../../layout'


class Phone extends Component {
    constructor(props){
        super(props);
        this.contact = props.navigation.getParam('contact', 'No contact');
        this.state= {
            actions: [
                {
                    text: "Nuevo",
                    icon: require("../../../assets/images/event.png"),
                    name: "bt_new",
                    position: 1
                },
            ],
            data: [
                { key: 1, section: true, label: 'Tipo de numero' },
                { key: 2, label: 'Trabajo', value: 'WORK' },
                { key: 3, label: 'Casa', value: 'HOME' },
                { key: 4, label: 'Celular', value: 'MOBILE' },
            ],
            phones: this.contact.phone.length <= 0 ? [] : this.contact.phone,
            visible: false,
            number: '',
            type: '',
            display: '',
        }
    }

    onCancel = () => {
        this.setState({
            visible: false,
            number: '',
            type: '',
            display: '',
        })
    };

    onConfirm = () => {
        const {phones, number, type} = this.state;
        phones.push({
            areaCode: number.substring(0, 3),
            phoneNumber: number.substring(3, 10),
            phoneType: type,
        });
        this.setState({
            visible: false,
            number: '',
            type: '',
            display: '',
            phones,
        });
        this.props.changeProfile({
            id: this.contact.id,
            phone: phones,
        });
    }

    onDelete(pos) {
        const {phones} = this.state;

        this.setState({
            phones: phones.splice(pos, phones.length),
        });
        this.props.changeProfile({
            id: this.contact.id,
            phone: phones.splice(pos, phones.length),
        });
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ phones: this.contact.phone });
        } else {
            const {phones} = this.contact.phone;
            const matching = [];
            phones.map(phone =>{
                const number = `${phone.areaCode}${phone.phoneNumber}`;
                if(number.indexOf(text) >= 0) matching.push(phone);
            });
            this.setState({ phones: matching });
        }
    }

    render() {
        const {navigation} = this.props;
        const {actions, data, phones, visible, number, display} = this.state;
        return (
            <Screen
            back
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar telefono'
            title="Telefonos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={name => {name === 'bt_new' ? this.setState({visible: !visible}) : null}}>
                {phones.map((phone, i) => (
                    <Card
                        key={i}
                        flex
                        borderless
                        shadowColor={COLORS.BLACK}
                        style={styles.card}
                        title={`(${phone.areaCode}) - ${phone.phoneNumber}`}
                        location={
                            <TouchableOpacity onPress={() => this.onDelete(i)}>
                                <Icon name="trash" family="font-awesome" style={{ paddingRight: 5 }} />
                            </TouchableOpacity>
                        }
                        caption={phone.phoneType}
                        avatar={require('../../../assets/images/phone.png')}
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                    />
                ))}
                <Dialog 
                    visible={visible}
                    title='Nuevo Telefono'
                    subtitle='Ingresa telefono.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'Telefono 10 digitos'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({number: e})}
                        value={number}
                    />
                    <ModalSelector
                        data={data}
                        initValue="Tipo"
                        onChange={option => { this.setState({ type: option.value, display: option.label }) }}>
                        <Input 
                            rounded
                            type={'default'}
                            placeholder={'Tipo'}
                            style={{width: width - SIZES.BASE * 4}}
                            value={display}
                            editable={false}
                        />
                    </ModalSelector>
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

export default connect(null, mapDispatchToProps)(Phone)
