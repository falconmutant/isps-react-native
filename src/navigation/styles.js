import { StyleSheet } from 'react-native'
import { theme } from '../themes/galio'

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: theme.COLORS.BLUE,
		paddingHorizontal: 28,
		paddingBottom: theme.SIZES.BASE,
		paddingTop: theme.SIZES.BASE * 2,
		justifyContent: 'center',
    },
    profile: {
        marginBottom: theme.SIZES.BASE / 2,
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginBottom: theme.SIZES.BASE,
    },
});