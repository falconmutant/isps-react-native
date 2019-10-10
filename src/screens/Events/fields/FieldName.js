import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowList, Dialog, Input, width, SIZES } from '../../../layout'


export default class FieldName extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        this.state={
            display: 'Nombre del Evento',
            visible: false,
            value:''
        }
    }

    onCancel = () => {
        this.setState({
            display: 'Nombre del Evento',
            visible: false,
            value:''
        });
    }

    onConfirm = () => {
        const {value} = this.state;
        this.props.saveField({
            name: value
        });
        this.setState({ display: value, visible: false });
    }

    render() {
        const {display, value, visible} = this.state;
        return (
            <RowList display={display} icon='pencil-square-o' onPress={() => this.setState({ visible : !visible })}>
                <Dialog 
                    visible={visible}
                    title='Nombre Evento'
                    subtitle='Ingresa un nombre para tu evento.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'Nombre del evento'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({value: e})}
                        value={value}
                    />
                </Dialog>
            </RowList>
        )
    }
}
