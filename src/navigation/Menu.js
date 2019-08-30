import React, { Component } from 'react'
import {TouchableWithoutFeedback, Image} from "react-native";
import { connect } from 'react-redux'
import { Block, Text } from "../themes/galio";
import styles from "./styles";
import {url} from '../constants'


class MenuProfile extends Component {
    render() {
        const {profile, navigation} = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', {contact: {...profile}})} >
                <Block style={styles.profile}>
                    <Image source={profile.image ? { uri: url(profile.image.image)} : require('../assets/images/avatar.png')} style={styles.avatar} />
                    <Text h5 color="white">{profile.fullName}</Text>
                </Block>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.auth.profile,
});

export default connect(mapStateToProps)(MenuProfile);