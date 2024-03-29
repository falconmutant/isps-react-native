import React, {Component} from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux'

import { Block, NavBar, styles, COLORS, actionsReducers} from '../../../layout'

import DataProfile from './DataProfile'
import ProfilePicture from './Picture'


class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const contact = this.props.navigation.getParam('contact', 'No contact');
        console.log(contact);
        return (
            <Block>
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <StatusBar barStyle="light-content" />
                    <Block style={styles.navbarProfile}>
                        <NavBar back transparent leftIconColor={COLORS.BLACK} onLeftPress={() => this.props.navigation.goBack()} />
                    </Block>
                    <ProfilePicture {...this.props} contact={contact} />
                    <DataProfile {...this.props}  contact={contact} />
                </ScrollView>
                
            </Block>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changePP: (image) => {
        dispatch({
            type: actionsReducers.SAVE_PROFILE_PICTURE_CONTACT,
            payload: image,
        });
    },
    changeProfile: (data) => {
        dispatch({
            type: actionsReducers.MODIFY_PROFILE_CONTACT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(Index);