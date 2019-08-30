import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Block } from '../../../themes/galio'
import { FloatingAction } from 'react-native-floating-action'
import { Header } from "../../../components/material"
import { actionsReducers } from "../../../constants"
import Dialog from 'react-native-dialog'

import Card from './components/Address/Card'

const actions = [
    {
        text: "Nuevo",
        icon: require("../../../assets/images/event.png"),
        name: "bt_new",
        position: 2
    },
];


class Address extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            contact: this.props.navigation.getParam('contact', 'No contact'),
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.renderCards();
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    renderCards = () => <Card contact={this.state.contact} {...this.props} />;

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header style={styles.header} back right title="Direcciones" navigation={navigation} />
                {this.renderCards()}
                <FloatingAction
                    actions={actions}
                    onPressItem={ name => (name === 'bt_new') ? navigation.navigate('NewAddress', {contact: this.state.contact}): {}}
                />
            </Block>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeProfile: (data) => {
        dispatch({
            type: actionsReducers.MODIFY_PROFILE_CONTACT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(Address)
