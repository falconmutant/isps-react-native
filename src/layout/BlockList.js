import React, { Component } from 'react'

import {Block, Text, SIZES} from './index'

export default class BlockList extends Component {
    render() {
        const {title, description, children} = this.props;
        return (
            <Block flex>
                <Block style={{paddingTop: SIZES.BASE, paddingBottom: SIZES.BASE / 2,}}>
                    <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                        {title}
                    </Text>
                    <Text center muted size={12}>
                        {description}
                    </Text>
                </Block>
                {children}
            </Block>
        )
    }
}
