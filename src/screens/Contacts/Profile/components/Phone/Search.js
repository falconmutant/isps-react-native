import React, {Component} from 'react';
import {Icon, Input, theme} from "../../../../../themes/galio";
import {Dimensions, StyleSheet} from "react-native";

const { width } = Dimensions.get('screen');
const { COLORS} = theme;

class Search extends Component {
    render() {
        const { navigation } = this.props;
        const iconSearch = <Icon size={16} color={COLORS.MUTED} name="search" family="font-awesome" />;
        return (
            <Input
                right
                color="black"
                style={styles.search}
                iconContent={iconSearch}
                placeholder="Buscar evento"
                onFocus={() => navigation.navigate('Search')}
            />
        );
    }
}

const styles = StyleSheet.create({
    search: {
        height: 48,
        width: width - 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 3,
    },
});

export default Search;