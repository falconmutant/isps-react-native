import {Dimensions, StyleSheet} from 'react-native'
import {theme} from '../../../themes/galio'

export const { width, height } = Dimensions.get('screen');
export const {COLORS, SIZES} = theme;

export default StyleSheet.create({
    header: {
        backgroundColor: theme.COLORS.WHITE,
        borderTopLeftRadius: theme.SIZES.BASE * 2,
        borderTopRightRadius: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE * 1.5,
        width,
        height: height,
    },
    navbar: {
        top: theme.SIZES.BASE,
        left: 0,
        right: 0,
        zIndex: 9999,
        position: 'absolute',
    },
    stats: {
        borderWidth: 0,
        width: width - theme.SIZES.BASE * 2,
        height: theme.SIZES.BASE * 4,
        marginVertical: theme.SIZES.BASE * 0.875,
    },
    title: {
        paddingTop: SIZES.BASE,
        paddingBottom: SIZES.BASE / 2,
    },
    avatar: {
        width: theme.SIZES.BASE * 2.5,
        height: theme.SIZES.BASE * 2.5,
        borderRadius: theme.SIZES.BASE * 1.25,
    },
    middle: {
        justifyContent: 'center',
    },
    text: {
        fontSize: theme.SIZES.FONT * 0.875,
        lineHeight: theme.SIZES.FONT * 1.25,
    },
    scroll: { 
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
    },
    home: {
        width: width,
    },
    content: {
        width: width,
    },
    settings: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
    rows: {
        height: SIZES.BASE * 2,
        paddingHorizontal: SIZES.BASE,
        marginBottom: SIZES.BASE / 2,
    },
    map: {
        width: 'auto',
        height: SIZES.CARD_IMAGE_HEIGHT,
    },
    card: {
        borderWidth: 0,
        backgroundColor: COLORS.WHITE,
        width: SIZES.CARD_WIDTH,
        marginVertical: SIZES.CARD_MARGIN_VERTICAL,
        borderRadius: SIZES.CARD_ROUND,
    },
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZES.CARD_FOOTER_HORIZONTAL,
        paddingVertical: SIZES.CARD_FOOTER_VERTICAL,
        backgroundColor: COLORS.TRANSPARENT,
        zIndex: 1,
    },
    title2: {
        justifyContent: 'center',
    },
    avatar2: {
        width: SIZES.CARD_AVATAR_WIDTH,
        height: SIZES.CARD_AVATAR_HEIGHT,
        borderRadius: SIZES.CARD_AVATAR_RADIUS,
    },
    mapBlock: {
        borderWidth: 0,
        overflow: 'hidden',
    },
    round: {
        borderRadius: SIZES.CARD_ROUND,
    },
    rounded: {
        borderRadius: SIZES.CARD_ROUNDED,
    },
});