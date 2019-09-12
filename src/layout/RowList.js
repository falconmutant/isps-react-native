import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Block, Text, Icon, styles } from './index'

export default class RowList extends Component {
    render() {
        const {display, icon, onPress, children} = this.props;
        return (
            <Block style={styles.rows}>
                <TouchableOpacity onPress={onPress}>
                    <Block row middle space="between" style={{paddingTop:7}}>
                        <Text size={14}>{display}</Text>
                        <Icon name={icon} family="font-awesome" style={{ paddingRight: 5 }} />
                    </Block>
                    {children}
                </TouchableOpacity>
            </Block>
        )
    }
}
