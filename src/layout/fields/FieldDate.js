import React, { Component } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'

import { RowList, months } from '../index'


export default class FieldDate extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        const {data, name} = props.data;
        const {date, display} = data ? this.getDate(data) : this.getDate();
        this.state={
            name,
            display,
            visible: false,
            value: date,
        }
    }

    getDate = (value=null) =>{
        const date = (value === null) ? new Date() : new Date(value);
        const fecha = `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;
        const minutes = date.getMinutes() < 10 ? `${date.getMinutes()}0` : date.getMinutes();
        const hora = `a las ${date.getHours()}:${minutes} hrs.`
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
            [this.state.name] : value,
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
