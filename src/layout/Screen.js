import React, { Component } from 'react'
import {ScrollView} from 'react-native'
import { FloatingAction } from 'react-native-floating-action'

import { Block, Header, Search, Tabs, styles } from './index'

export default class Screen extends Component {
    render() {
        const {search, tabs, floating, dataFloating, onPressFloating, children} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header {...this.props}>
                    <Block center style={styles.header}>
                        {search ? <Search {...this.props} /> : null}
                        {tabs ? <Tabs {...this.props} /> : null}
                    </Block>
                </Header>
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>
                    {children}
                </ScrollView>
                {floating ? <FloatingAction actions={dataFloating} onPressItem={onPressFloating}  /> : null}
            </Block>
        )
    }
}
