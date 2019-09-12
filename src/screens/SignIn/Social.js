import React, { Component } from 'react'
import {Alert} from 'react-native'

import { Block, Button, Text, styles, COLORS, SIZES } from '../../layout'

const data = [
    {icon: 'facebook',},
    {icon: 'twitter',},
    {icon: 'google',},
];

export default class Social extends Component {
    render() {
        return (
            <Block flex center style={styles.socialBlock}>
                <Text muted center size={SIZES.FONT * 0.875}>
                    o ingresa
                </Text>
                <Block row center space="between" style={styles.buttonsBlock}>
                    {data.map((icon, i) => (
                        <Block key={i} flex middle right>
                            <Button
                                round
                                onlyIcon
                                shadowless
                                iconSize={SIZES.BASE * 1.625}
                                icon={icon.icon}
                                iconFamily="Font-Awesome"
                                color="transparent"
                                iconColor={COLORS.WHITE}
                                style={styles.social}
                                onPress={() => Alert.alert('No implementado')}
                            />
                        </Block>
                    ))}
                </Block>
            </Block>
        )
    }
}
