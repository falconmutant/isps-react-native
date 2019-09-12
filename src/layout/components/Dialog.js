import React, { Component } from 'react'
import Dialog from 'react-native-dialog'

export default class DialogEvent extends Component {
    render() {
        const {title, subtitle, visible, labelCancel, labelConfirm, onCancel, onConfirm, children} = this.props;
        return (
            <Dialog.Container visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description>
                    {subtitle}
                </Dialog.Description>
                {children}
                <Dialog.Button label={labelCancel} onPress={onCancel} />
                <Dialog.Button label={labelConfirm} onPress={onConfirm} />
            </Dialog.Container>
        )
    }
}
