import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Block, Text, Icon } from "../../themes/galio"
import { materialTheme } from '../../themes/material';


class DrawerItem extends Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
        case 'Home':
            return (
                <Icon
                    size={16}
                    name="home"
                    family="font-awesome"
                    color={focused ? 'white' : materialTheme.COLORS.MUTED} />
            );
        case 'Contactos':
            return (
                <Icon
                    size={16}
                    name="users"
                    family="font-awesome"
                    color={focused ? 'white' : materialTheme.COLORS.MUTED} />
            );
        case 'Eventos':
            return (
                <Icon
                    size={16}
                    name="calendar"
                    family="font-awesome"
                    color={focused ? 'white' : materialTheme.COLORS.MUTED} />
            );
        case 'Salir':
            return (
                <Icon
                    size={16}
                    name="sign-out"
                    family="font-awesome"
                    color={focused ? 'white' : materialTheme.COLORS.MUTED} />
            );
      
      default:
        return null;
    }
  }

  render() {
    const { focused, title } = this.props;
    return (
      <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={focused ? 'white' : materialTheme.COLORS.MUTED}>
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: materialTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
})