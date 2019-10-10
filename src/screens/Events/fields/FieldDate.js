import React, { Component } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'

import { RowList, months } from '../../../layout'


export default class FieldDate extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        name: PropTypes.string,
    }

    constructor(props){
        super(props);
        const {date, display} = this.getDate();
        this.state={
            display,
            visible: false,
            value: date,
        }
    }

    getDate = (value=null) =>{
        const date = (value === null) ? new Date() : new Date(value);
        const fecha = `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;
        const hora = `a las ${date.getHours()}:${date.getMinutes()} hrs.`
        return {date, display: `${fecha} ${hora}`}
    }

    onConfirm = val => {
        const {value} = this.state;
        const {date, display} = this.getDate(val);
        this.setState({
            display,
            visible: false,
            value: date,
        });
        this.props.saveField({
            [this.props.name] : value,
        });
    }

    onCancel = () =>  {
        const {date, display} = this.getDate(val);
        this.setState({ visible: false, value:date, display})
    }

    render() {
        const {display, value, visible} = this.state;
        return (
            <RowList display={display} icon='clock-o' onPress={() => this.setState({ visible : !visible })}>
                <DateTimePicker
                    isVisible={visible}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    minimumDate={value}
                    mode={'datetime'}
                    date={value}
                />
            </RowList>
        )
    }
}
