import React from 'react'
import {Dimensions, StyleSheet} from 'react-native'
import { theme } from '../../../themes/galio'

export const { width } = Dimensions.get('screen');
export const { COLORS, SIZES} = theme;

export default styles = StyleSheet.create({
    agenda: {
        width: width
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
    home: {
        width: width,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    header: {
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        elevation: 4,
        zIndex: 2,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    tab: {
        backgroundColor: COLORS.TRANSPARENT,
        width: width * 0.33,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '300'
    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: COLORS.MUTED,
    },
    events: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
});