import React, { Component } from 'react'
import { withNavigation, DrawerActions } from 'react-navigation'

import { Block, NavBar, styles, COLORS } from '../index'


class Header extends Component {
    handleLeftPress = () => {
        const { back, navigation } = this.props;
        return (back ? navigation.goBack() : navigation.dispatch(DrawerActions.openDrawer()));
    };

    render() {
        const { back, title, white, transparent, right, children } = this.props;
        const headerStyles = [styles.shadow, { backgroundColor: 'rgbs(0,0,0)' },];
        return (
            <Block style={headerStyles}>
                <NavBar
                    back={back}
                    title={title}
                    style={[styles.navbar, back ? styles.header : null,]}
                    transparent={transparent}
                    right={right}
                    rightStyle={{ alignItems: 'center' }}
                    leftStyle={{ paddingVertical: 12, flex: 0.3 }}
                    leftIconColor={white ? COLORS.WHITE : COLORS.ICON}
                    titleStyle={[
                        styles.title,
                        {color: COLORS[white ? 'WHITE' : 'ICON']},
                    ]}
                    onLeftPress={this.handleLeftPress}
                />
                {children}
            </Block>
        )
    }
}

export default withNavigation(Header);
