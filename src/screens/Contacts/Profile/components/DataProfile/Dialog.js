import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Dialog from 'react-native-dialog'

import {Block, Text, Icon, styles } from '../../../../../layout'

export default class DialogName extends Component {
    constructor(props){
        super(props);
        const {fullName} = this.props.contact;
        this.state = {
            display: fullName ? fullName : 'Nombre completo',
            visible: false,
            value: fullName ? fullName: '',
        }
    }

    Cancel = () => {
        const {fullName} = this.props.contact;
        this.setState({
            display: fullName ? fullName : 'Nombre completo',
            visible: false,
            value: fullName ? fullName: '',
        })
    };

    Press = () => {
        const {value} = this.state;
        this.setState({
            display: value,
            visible: false,
            value,
        });
        this.props.changeProfile({
            id: this.props.contact.id,
            fullName: value,
        })
    }
    render() {
        const {display, visible, value} = this.state
        return (
            <Block style={styles.row}>
                <TouchableOpacity onPress={() => this.setState({ visible : !visible })}>
                    <Block row middle space="between" style={{paddingTop:7}}>
                        <Text size={14}>{display}</Text>
                        <Icon name="user" family="font-awesome" style={{ paddingRight: 5 }} />
                    </Block>
                    <Dialog.Container visible={visible}>
                        <Dialog.Title>Nombre</Dialog.Title>
                        <Dialog.Description>
                            Ingresa nombre completo.
                        </Dialog.Description>
                        <Dialog.Input placeholder='Nombre completo' onChangeText={(e) => this.setState({value: e})} value={value} />
                        <Dialog.Button label="Cancelar" onPress={this.Cancel} />
                        <Dialog.Button label="OK" onPress={this.Press} />
                    </Dialog.Container>
                </TouchableOpacity>
            </Block>
        )
    }
}
