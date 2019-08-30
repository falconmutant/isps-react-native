import React, { Component } from 'react'
import {Alert} from 'react-native'
import { Block, Button, Text, theme } from '../../themes/galio'
import styles from './styles'

export default class Social extends Component {
    render() {
        return (
            <Block flex center style={styles.socialBlock}>
                <Block row center space="between" style={styles.buttonsBlock}>
                    <Block flex middle right>
                        <Button
                            round
                            onlyIcon
                            shadowless
                            iconSize={theme.SIZES.BASE * 1.625}
                            icon="facebook"
                            iconFamily="Font-Awesome"
                            iconColor={theme.COLORS.WHITE}
                            style={styles.social}
                            onPress={() => Alert.alert('No implementado')}
                        />
                    </Block>
                    <Block flex middle center>
                        <Button
                            round
                            onlyIcon
                            shadowless
                            iconSize={theme.SIZES.BASE * 1.625}
                            icon="twitter"
                            iconFamily="Font-Awesome"
                            iconColor={theme.COLORS.WHITE}
                            style={styles.social}
                            onPress={() => Alert.alert('No implementado')}
                        />
                    </Block>
                    <Block flex middle left>
                        <Button
                            round
                            onlyIcon
                            shadowless
                            iconSize={theme.SIZES.BASE * 1.625}
                            icon="google"
                            iconFamily="Font-Awesome"
                            iconColor={theme.COLORS.WHITE}
                            style={styles.social}
                            onPress={() => Alert.alert('No implementado')}
                        />
                    </Block>
                </Block>
                <Text muted center size={theme.SIZES.FONT * 1.875}>
                    o
                </Text>
            </Block>
        )
    }
}
