import React, { Component } from 'react'
import { withNavigation, DrawerActions } from 'react-navigation'
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native'
import { Button, Block, NavBar, Input, Text, Icon, theme } from '../../themes/galio'
import { materialTheme } from '../../themes/material'

const { COLORS, SIZES } = theme;
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const TabsButtons = ({isWhite, style, navigation, target, icon}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate(target)}>
        <Icon
            family="font-awesome"
            size={16}
            name={icon}
            color={COLORS[isWhite ? 'WHITE' : 'ICON']}
        />
        <Block middle style={styles.notify} />
    </TouchableOpacity>
);

class Header extends Component {
    handleLeftPress = () => {
        const { back, navigation } = this.props;
        return (back ? navigation.goBack() : navigation.dispatch(DrawerActions.openDrawer()));
    };

    renderRight = () => {
        const { white, title, navigation } = this.props;
        const { routeName } = navigation.state;
        if (title === 'Title') {
            return [
                <TabsButtons key='chat-title' icon='comments' navigation={navigation} isWhite={white} />,
                <TabsButtons key='basket-title' icon='shopping-basket' navigation={navigation} isWhite={white} />
            ]
        }
        return [
            <TabsButtons key={`chat-${routeName.toLowerCase()}`} icon='comments' target='Chat' navigation={navigation} isWhite={white} />,
            <TabsButtons key={`basket-${routeName.toLowerCase()}`} icon='shopping-basket' target='Product' navigation={navigation} isWhite={white} />
        ];
    };

    renderHeader = () => {
        const { search, tabs, renderSearch, renderTabs } = this.props;
        if (search || tabs) {
            return (
                <Block center style={styles.header}>
                    {search ? renderSearch : null}
                    {tabs ? renderTabs : null}
                </Block>
            )
        }
        return null;
    };

    render() {
        const { back, title, white, transparent, navigation, right } = this.props;
        const { routeName } = navigation.state;
        const noShadow = ['Home', 'Events', 'SignOut'].includes(routeName);
        const headerStyles = [styles.shadow, { backgroundColor: 'rgbs(0,0,0)' },];

        return (
            <Block style={headerStyles}>
                <NavBar
                    back={back}
                    title={title}
                    style={[styles.navbar, back ? styles.header : null,]}
                    transparent={transparent}
                    right={ !right ? this.renderRight() : null}
                    rightStyle={{ alignItems: 'center' }}
                    leftStyle={{ paddingVertical: 12, flex: 0.3 }}
                    leftIconColor={white ? COLORS.WHITE : COLORS.ICON}
                    titleStyle={[
                        styles.title,
                        {color: COLORS[white ? 'WHITE' : 'ICON']},
                    ]}
                    onLeftPress={this.handleLeftPress}
                />
                {this.renderHeader()}
            </Block>
        );
    }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
    button: {
        padding: 12,
        position: 'relative',
    },
    title: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navbar: {
        paddingVertical: 0,
        //paddingBottom: SIZES.BASE * 1.5,
        //paddingTop: iPhoneX ? SIZES.BASE * 4 : SIZES.BASE,
        zIndex: 5,
        width: width,
    },
    shadow: {
        backgroundColor: COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.2,
        elevation: 3,
    },
    notify: {
        backgroundColor: materialTheme.COLORS.LABEL,
        borderRadius: 4,
        height: SIZES.BASE / 2,
        width: SIZES.BASE / 2,
        position: 'absolute',
        top: 8,
        right: 8,
    },
    header: {
        backgroundColor: COLORS.WHITE,

    },
    divider: {
        borderRightWidth: 0.3,
        borderRightColor: COLORS.MUTED,
    },
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
    tabs: {
        marginBottom: 24,
        marginTop: 10,
        elevation: 4,
    },
    tab: {
        backgroundColor: COLORS.TRANSPARENT,
        width: width * 0.50,
        borderRadius: 0,
        borderWidth: 0,
        height: 24,
        elevation: 0,
    },
    tabTitle: {
        lineHeight: 19,
        fontWeight: '300'
    },
});