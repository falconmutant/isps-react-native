import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../themes/galio'

export const { COLORS, SIZES } = theme;
export const { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    initBlock: {
        backgroundColor: COLORS.WHITE,
    },
    socialBlock: {
        marginTop: SIZES.BASE * 1.875,
        marginBottom: height * 0.1,
    },
    buttonsBlock: {
        marginVertical: SIZES.BASE * 1.875,
    },
    scroll: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: SIZES.BASE * 0.3,
        paddingHorizontal: SIZES.BASE,
        backgroundColor: COLORS.WHITE,
    },
    social: {
        width: SIZES.BASE * 3.5,
        height: SIZES.BASE * 3.5,
        borderRadius: SIZES.BASE * 1.75,
        justifyContent: 'center',
    },
});