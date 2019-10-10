import React, { Component } from 'react'

import {Block, Button, Icon, Text, styles, width} from '../index'

export default class Tabs extends Component {
    render() {
        const {tabsData, navigation} = this.props;
        const style = {width: width * (100 / tabsData.length *.01)};
        return (
            <Block row style={styles.tabs}>
                {tabsData.map((tab, i) =>(
                    <Button key={i} shadowless style={[styles.tab, styles.divider, style]} onPress={() => navigation.navigate(tab.target)}>
                        <Block row middle>
                            <Icon name={tab.icon} family="font-awesome" style={{ paddingRight: 8 }} />
                            <Text size={16} style={styles.tabTitle}>{tab.title}</Text>
                        </Block>
                    </Button>
                ))}
            </Block>
        )
    }
}
