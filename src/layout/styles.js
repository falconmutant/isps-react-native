import { StyleSheet, Dimensions } from 'react-native'
import { theme } from './index'

export const { COLORS, SIZES } = theme;
export const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    shadow: {
        backgroundColor: COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    },
    navbar: {
        paddingVertical: 0,
        zIndex: 5,
        width: width,
    },
    navbarProfile: {
        top: SIZES.BASE,
        left: 0,
        right: 0,
        zIndex: 9999,
        position: 'absolute',
    },
    header: {
        backgroundColor: COLORS.WHITE,
    },
    headerProfile: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: SIZES.BASE * 2,
        borderTopRightRadius: SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
        paddingHorizontal: SIZES.BASE * 1.5,
        width,
        height,
    },
    title: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    home: {
        width,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
        width: width,
    },
    tab: {
        backgroundColor: COLORS.TRANSPARENT,
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
        borderRightColor: COLORS.MATERIAL_MUTED,
    },
    defaultStyle: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    activeStyle: {
        backgroundColor: COLORS.BLUE,
        borderRadius: 4,
    },
    shadowDrawer: {
        shadowColor: COLORS.MATERIAL_BLACK,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2
    },
    profile: {
        marginBottom: SIZES.BASE / 2,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: SIZES.BASE,
    },
    container: {
		flex: 1,
    },
    headerDrawer: {
		backgroundColor: COLORS.BLUE,
		paddingHorizontal: 28,
		paddingBottom: SIZES.BASE,
		paddingTop: SIZES.BASE * 2,
		justifyContent: 'center',
    },
    initBlock: {
        width,
        height
    },
    formBlock: {
        marginTop: height * 0.1,
        marginBottom: height * 0.1,
    },
    socialBlock: {
        marginTop: SIZES.BASE * 1.875,
    },
    buttonsBlock: {
        marginVertical: SIZES.BASE * 1.875,
    },
    social: {
        width: SIZES.BASE * 2.5,
        height: SIZES.BASE * 2.5,
        borderRadius: SIZES.BASE * 1.75,
        justifyContent: 'center',
    },
    containerSplash: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null
    },
    video:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1
    },
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZES.CARD_FOOTER_HORIZONTAL,
        paddingVertical: SIZES.CARD_FOOTER_VERTICAL,
        backgroundColor: COLORS.TRANSPARENT,
        zIndex: 1,
    },
    avatarCardboard: {
        width: SIZES.CARD_AVATAR_WIDTH,
        height: SIZES.CARD_AVATAR_HEIGHT,
        borderRadius: SIZES.CARD_AVATAR_RADIUS,
    },
    imageBlock: {
        borderWidth: 0,
        overflow: 'hidden',
    },
    image: {
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
    round: {
        borderRadius: SIZES.CARD_ROUND,
    },
    rounded: {
        borderRadius: SIZES.CARD_ROUNDED,
    },
    map: {
        width: 'auto',
        height: SIZES.CARD_IMAGE_HEIGHT,
    },
    mapFull: {
        width,
        height: height - (SIZES.BASE * 3),
    },
    mapBlock: {
        borderWidth: 0,
        overflow: 'hidden',
    },
    scroll: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
    rows: {
        height: SIZES.BASE * 2,
        paddingHorizontal: SIZES.BASE,
        marginBottom: SIZES.BASE / 2,
    },
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
    title2: {
        justifyContent: 'center',
    },
    avatar2: {
        width: SIZES.CARD_AVATAR_WIDTH,
        height: SIZES.CARD_AVATAR_HEIGHT,
        borderRadius: SIZES.CARD_AVATAR_RADIUS,
    },
    spinner: {
        marginTop: height / 4,
        marginBottom: 50,
        width: width - SIZES.BASE * 2,
        //height: (height / 2) + SIZES.BASE,
    },    
});