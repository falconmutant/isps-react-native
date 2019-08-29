import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../../themes/galio'

export const { width } = Dimensions.get('screen');
export const { COLORS, SIZES } = theme;

export default StyleSheet.create({
    home: {
        width,
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
    cardContacts: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
    cards: {
        flex: 1,
        //backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        borderWidth: 0,
        backgroundColor: COLORS.WHITE,
        width: width - SIZES.BASE * 2,
        marginVertical: SIZES.BASE * 0.875,
    },
    cardImageRadius: {
        borderRadius: theme.SIZES.BASE * 0.1875,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
});