import { Platform, StatusBar, Dimensions } from 'react-native';
import { theme } from './galio';

const { height, width } = Dimensions.get('window');

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export const materialTheme = {
    COLORS: {
        DEFAULT: '#DCDCDC',
        PRIMARY: '#0094FE',
        LABEL: '#FE2472',
        INFO: '#00BCD4',
        ERROR: '#F44336',
        SUCCESS: '#4CAF50',
        WARNING: '#FF9800',
        MUTED: '#979797',
        INPUT: '#DCDCDC',
        ACTIVE: '#0094FE',
        BLUE: '#0094FE',
        BUTTON_COLOR: '#0094FE',
        PLACEHOLDER: '#9FA5AA',
        SWITCH_ON: '#0094FE',
        SWITCH_OFF: '#D4D9DD',
        GRADIENT_START: '#6B24AA',
        GRADIENT_END: '#AC2688',
        PRICE_COLOR: '#EAD5FB',
        BORDER_COLOR: '#E7E7E7',
        BLOCK: '#E7E7E7',
        ICON: '#4A4A4A',
    },
    SIZES: {
        BLOCK_SHADOW_RADIUS: 2,
    }
};


const Onboarding = 'https://images.unsplash.com/photo-1505995433366-e12047f3f144?fit=crop&w=840&q=80';
const Pro = 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?fit=crop&w=840&q=80';
const Products = {
    'Accessories': 'https://source.unsplash.com//l1MCA0VyNrk/840x840',
};

const Profile = 'https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80';
const Avatar = 'https://images.unsplash.com/photo-1518725522904-4b3939358342?fit=crop&w=210&q=80';

const Viewed = [
    'https://images.unsplash.com/photo-1508264443919-15a31e1d9c1a?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1487376480913-24046456a727?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1494894194458-0174142560c0?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1542068829-1115f7259450?fit=crop&w=240&q=80',
];

export const Images =  {
    Onboarding,
    Pro,
    Products,
    Profile,
    Viewed,
    Avatar,
};