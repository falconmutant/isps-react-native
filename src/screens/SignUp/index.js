import React, {Component} from 'react'
import { Block } from '../../themes/galio'
import { Header } from '../../components/material'
import SignUpForm from './Form'
import styles, { width } from './styles'
import { actionsReducers } from '../../constants'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {ScrollView} from "react-native";

class SignUp extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
    };

    render() {
        const { navigation, register } = this.props;
        return (
            <Block flex={1} style={styles.initBlock}>
                <Header back title="Registro" navigation={navigation} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}>
                    <SignUpForm navigation={navigation} register={register} width={width} />
                </ScrollView>
            </Block>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (values) => {
        dispatch({ type: actionsReducers.REGISTER, payload: values});
    },
});

export default connect(null, mapDispatchToProps)(SignUp);