import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { Block, Text, Icon } from '../../../../../themes/galio'
import styles from '../../styles'

export default class Modal extends Component {
    constructor(props){
        super(props);
        const {maritalStatus} = this.props.contact;
        this.state = {
            display: maritalStatus ? maritalStatus=='SINGLE' ? 'Soltero' : maritalStatus=='MARRIED' ? 'Casado' : maritalStatus=='DIVORCED' ? 'Divorciado' : '' : '',
            visible: false,
            value: ''
        }
    }

    Change = option => {
        const {value} = option;
        this.setState({
            display: value ? value=='SINGLE' ? 'Soltero' : value=='MARRIED' ? 'Casado' : value=='DIVORCED' ? 'Divorciado' : '' : '',
            value,
        });
        this.props.changeProfile({
            id: this.props.contact.id,
            maritalStatus: value,
        });
    };

    render() {
        const {display} = this.state;
        const data = [
            { key: 1, section: true, label: 'Estado Civil' },
            { key: 2, label: 'Soltero', value: 'SINGLE' },
            { key: 3, label: 'Casado', value: 'MARRIED' },
            { key: 4, label: 'Divorciado', value: 'DIVORCED' },
        ];
        return (
            <Block style={styles.row}>
                <ModalSelector
                    data={data}
                    ref={selector => { this.selector = selector; }}
                    onChange={this.Change}
                    customSelector={
                        <TouchableOpacity onPress={() => this.selector.open()}>
                            <Block row middle space="between" style={{paddingTop:7}}>
                                <Text size={14}>{`Estado civil ${display}`}</Text>
                                <Icon name="child" family="font-awesome" style={{ paddingRight: 5 }} />
                            </Block>
                        </TouchableOpacity>
                    }
                />
            </Block>
        )
    }
}
