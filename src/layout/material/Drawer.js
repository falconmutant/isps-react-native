import React, { Component } from 'react'

import { Block, Icon, Text, styles, COLORS} from '../index'

export default class Drawer extends Component {
    render() {
        const { focused, title, icon } = this.props;
        return (
            <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadowDrawer] : null]}>
                <Block middle flex={0.1} style={{ marginRight: 28 }}>
                    <Icon
                        size={16}
                        name={icon}
                        family="font-awesome"
                        color={focused ? 'white' : COLORS.MATERIAL_MUTED} />
                </Block>
                <Block row center flex={0.9}>
                    <Text size={18} color={focused ? 'white' : COLORS.MATERIAL_MUTED}>
                        {title}
                    </Text>
                </Block>
            </Block>
        )
    }
}
