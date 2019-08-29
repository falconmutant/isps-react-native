import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Block, theme } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material";
import { actionsReducers } from "../../../constants";

import Tabs from './Tabs'
import Search from './Search'
import CardEvents from './Card'

const { width } = Dimensions.get('screen');
const { COLORS } = theme;

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    header: {
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        elevation: 4,
        zIndex: 2,
    },
});

const actions = [
    {
        text: "Evento",
        icon: require("../../../assets/images/event.png"),
        name: "bt_event",
        position: 2
    },
    {
        text: "Catalogo",
        icon: require("../../../assets/images/catalog.png"),
        name: "bt_catalog",
        position: 1
    }
];

class Events extends Component {

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getEvents(this.props.auth);
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    renderSearch = () => <Search {...this.props} />;

    renderTabs = () => <Tabs {...this.props} />;

    renderEvents = () => <CardEvents {...this.props} />;

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} search tabs title="Eventos" navigation={navigation} renderTabs={this.renderTabs()} renderSearch={this.renderSearch()} />
                {this.renderEvents()}
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        (name === 'bt_event') ? navigation.navigate('NewEvent') : navigation.navigate('NewCatalog');
                    }}
                />
            </Block>
        );
    }
}


const mapStateToProps = state => ({
    events: state.event.events,
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    getEvents: (data) => {
        dispatch({
            type: actionsReducers.GET_EVENTS,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);