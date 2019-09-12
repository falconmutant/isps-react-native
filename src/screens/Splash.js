import React, { Component } from 'react'
import { View } from 'react-native'
import Video from 'react-native-video'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {actionsReducers, styles, Files} from '../layout'

class Splash extends Component {
    static propTypes = {
        validateAuth: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    };

    performTimeConsumingTask = async() => {
        const {isAuthenticated, navigation} = this.props;
        isAuthenticated ? this.props.validateAuth(): navigation.navigate({ routeName: 'Auth' });
    };

    async componentDidMount() {
        await this.performTimeConsumingTask();
    }

    render() {
        return (
            <View style={styles.containerSplash}>
                <Video
                    source={Files.splash}
                    style={styles.video}
                    muted={true}
                    repeat={true}
                    resizeMode='cover'
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
    validateAuth: () => {
        dispatch({ type: actionsReducers.VALIDATE_AUTH });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);