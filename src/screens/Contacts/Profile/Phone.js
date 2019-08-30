import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"
import Dialog from 'react-native-dialog'
import ModalSelector from 'react-native-modal-selector'

import Card from './components/Phone/Card'

const actions = [
    {
        text: "Nuevo",
        icon: require("../../../assets/images/event.png"),
        name: "bt_new",
        position: 2
    },
];

class Phone extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            visible: false,
            code: '',
            number: '',
            type: '',
            display: '',
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
            code: '',
            number: '',
            type: '',
            display: '',
        })
    };

    Press = () => {
        const {contact} = this.state;
        contact.phone.push({
            areaCode: this.state.code,
            phoneNumber: this.state.number,
            phoneType: this.state.type,
        });
        this.setState({
            visible: false,
            code: '',
            number: '',
            type: '',
            display: '',
        });
        this.props.changeProfile({
            id: contact.id,
            phone: contact.phone,
        });
    }

    render() {
        const {navigation} = this.props;
        const data = [
            { key: 1, section: true, label: 'Tipo de numero' },
            { key: 2, label: 'Trabajo', value: 'WORK' },
            { key: 3, label: 'Casa', value: 'HOME' },
            { key: 4, label: 'Celular', value: 'MOBILE' },
        ];
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} back title="" navigation={navigation} />
                {this.renderCards()}
                <FloatingAction
                    actions={actions}
                    onPressItem={ name => (name === 'bt_new') ? this.setState({visible: true}): {}}
                />
                <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>Nuevo telefono</Dialog.Title>
                    <Dialog.Description>
                        Ingresa telefono.
                    </Dialog.Description>
                    <Dialog.Input placeholder='Lada' onChangeText={(e) => this.setState({code: e})} />
                    <Dialog.Input placeholder='Numero' onChangeText={(e) => this.setState({number: e})} />
                    <ModalSelector
                        data={data}
                        initValue="Tipo"
                        onChange={option => { this.setState({type:option.value, display:option.label}) }}>
                        <Dialog.Input 
                            editable={false} 
                            placeholder='Tipo'
                            value={this.state.display} />
                    </ModalSelector>
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

export default connect(null, mapDispatchToProps)(Phone)
