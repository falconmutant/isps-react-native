import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {Block, actionsReducers} from '../layout'

class SignOut extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
    };

    componentDidMount(){
        this.props.logout();
    }

    render() {
        return (
            <Block flex={1}>
            </Block>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch({ type: actionsReducers.LOGOUT });
    },
});

export default connect(null, mapDispatchToProps)(SignOut);