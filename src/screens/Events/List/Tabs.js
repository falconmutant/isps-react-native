import React, {Component} from 'react';
import {Block, Button, Icon, Text, theme} from "../../../themes/galio";
import {Dimensions, StyleSheet} from "react-native";

const { width } = Dimensions.get('screen');
const { COLORS} = theme;

class Tabs extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <Block row style={styles.tabs}>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Events')}>
                    <Block row middle>
                        <Icon name="list" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Eventos</Text>
                    </Block>
                </Button>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Calendar')}>
                    <Block row middle>
                        <Icon name="calendar" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Calendario</Text>
                    </Block>
                </Button>
                <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Category')}>
                    <Block row middle>
                        <Icon size={16} name="book" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Categorias</Text>
                    </Block>
                </Button>
            </Block>
        );
    }
}


const styles = StyleSheet.create({
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
});

export default Tabs;