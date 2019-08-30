import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../themes/galio'
import { materialTheme } from '../../themes/material'

export const{ SIZES } = theme
export const { COLORS } = materialTheme

export const { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    scroll: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
    },
    initBlock: {
        width,
        height
    },
    formBlock: {
        marginTop: height * 0.1,
    },
    socialBlock: {
        marginTop: theme.SIZES.BASE * 1.875,
    },
    buttonsBlock: {
        marginVertical: theme.SIZES.BASE * 1.875,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: theme.SIZES.BASE * 0.3,
        paddingHorizontal: theme.SIZES.BASE,
        backgroundColor: theme.COLORS.WHITE,
    },
    social: {
        width: theme.SIZES.BASE * 2.5,
        height: theme.SIZES.BASE * 2.5,
        borderRadius: theme.SIZES.BASE * 2.75,
        justifyContent: 'center',
    },
});