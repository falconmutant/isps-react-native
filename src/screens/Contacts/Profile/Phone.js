import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"

import Card from '../List/Card'
import Search from '../List/Search'

const actions = [
    {
        text: "Nuevo",
        icon: require("../../../assets/images/event.png"),
        name: "bt_new",
        position: 2
    },
    {
        text: "Importar",
        icon: require("../../../assets/images/catalog.png"),
        name: "bt_import",
        position: 1
    }
];

export default class Phone extends Component {
    renderSearch = () => <Search {...this.props} />;

    renderCards = () => <Card {...this.props} />;

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} back search title="" navigation={navigation} renderSearch={this.renderSearch()} />
                {this.renderCards()}
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        (name === 'bt_new') ? navigation.navigate({ routeName: 'NewContact' }) : navigation.navigate({ routeName: 'ImportContact' });
                    }}
                />
            </Block>
        )
    }
}
