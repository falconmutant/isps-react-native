import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { DrawerActions } from 'react-navigation'

import { Block, styles } from '../../layout'

class Dashboard extends Component {
    componentDidMount(){
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.products}>
                </ScrollView>
            </Block>
        );
    }
}

export default Dashboard;