import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowList, Dialog, Input, width, SIZES } from '../index'


export default class FieldName extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        const {input, display, icon, title, subtitle, type, placeholder} = props.data;
        this.state={
            input,
            display,
            icon: icon ? icon: 'pencil-square-o',
            visible: false,
            value: '',
            title,
            subtitle,
            type: type ? type : 'default',
            placeholder,
        }
    }

    onCancel = () => {
        const {display, value} = this.props;
        this.setState({
            display: value ? value : display,
            visible: false,
            value: value ? value : '',
        });
    }

    onConfirm = () => {
        const {input, value} = this.state;
        this.props.saveField({ [input]: value });
        this.setState({ display: value, visible: false, value: '' });
    }

    render() {
        const {display, icon, value, visible, title, subtitle, type, placeholder} = this.state;
        const {dialog} = this.props;
        return (
            <RowList display={display} icon={icon} onPress={() => this.setState({ visible : !visible })}>
                {dialog ? 
                    <Dialog 
                        visible={visible}
                        title={title}
                        subtitle={subtitle}
                        labelCancel='CANCELAR'
                        labelConfirm='OK'
                        onCancel={this.onCancel}
                        onConfirm={this.onConfirm}>
                        <Input
                            rounded
                            type={type}
                            placeholder={placeholder}
                            style={{width: width - SIZES.BASE * 4}}
                            onChangeText={(e) => this.setState({value: e})}
                            value={value}
                        />
                    </Dialog> :
                    <Input
                        rounded
                        type={type}
                        placeholder={placeholder}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({value: e})}
                        value={value}
                    />
                }
            </RowList>
        )
    }
}
