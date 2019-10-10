import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import {Block, Text, Icon, styles } from '../../../../../layout'

const months = ['Enero','Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


export default class DatePicker extends Component {
    
    constructor(props){
        super(props);
        const {doBirth} = this.props.contact;
        this.state = {
            display: doBirth ? this.dateStr(new Date(doBirth)) : 'Fecha de nacimiento',
            visible: false,
            value: doBirth ? new Date(doBirth) : new Date()
        }
    }

    dateStr = d => `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;

    Cancel = () => this.setState({
        display: doBirth ? this.dateStr(new Date(doBirth)) : 'Fecha de nacimiento',
        visible: false,
        value: doBirth ? new Date(doBirth) : new Date()
    });

    Confirm = date => {
        this.setState({ 
            display: this.dateStr(date),
            visible: false,
            value: date
        })
        this.props.changeProfile({
            id: this.props.contact.id,
            doBirth: date.toJSON().split('T')[0],
        })
    }

    render() {
        const {display, visible, value} = this.state;
        return (
            <Block style={styles.rows}>
                <TouchableOpacity onPress={() => this.setState({visible: !visible})}>
                    <Block row middle space="between" style={{paddingTop:7}}>
                        <Text size={14}>{display}</Text>
                        <Icon name="birthday-cake" family="font-awesome" style={{ paddingRight: 5 }} />
                    </Block>
                    <DateTimePicker
                        isVisible={visible}
                        onConfirm={this.Confirm}
                        onCancel={this.Cancel}
                        date={value}
                        mode={'date'}
                    />
                </TouchableOpacity>
            </Block>
        )
    }
}
