import React, {Component} from 'react';
import { Icon, Input } from "../../../themes/galio";
import styles, { COLORS } from './styles'

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
                placeholder="Buscar Contacto"
                onFocus={() => navigation.navigate({ routeName: 'Search' })}
            />
        );
    }
}

export default Search;