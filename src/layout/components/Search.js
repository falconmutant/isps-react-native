import React, { Component } from 'react'

import {Input, Icon, styles, COLORS} from '../index'

export default class Search extends Component {
    render() {
        const { onChangeSearch, placeholderSearch } = this.props;
        const iconSearch = <Icon size={16} color={COLORS.MUTED} name="search" family="font-awesome" />;
        return (
            <Input
                right
                color="black"
                style={styles.search}
                iconContent={iconSearch}
                placeholder={placeholderSearch}
                onChangeText={onChangeSearch}
            />
        )
    }
}
