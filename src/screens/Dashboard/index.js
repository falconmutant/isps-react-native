import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { DrawerActions } from 'react-navigation'
import Spinner from 'react-native-spinkit'

import { Screen, styles } from '../../layout'

class Dashboard extends Component {
    componentDidMount(){
        this.props.navigation.dispatch(DrawerActions.openDrawer());
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    render() {
        const {navigation} = this.props;
        return (
            <Screen
            title="Home"
            navigation={navigation}>
            </Screen>
        );
    }
}

export default Dashboard;