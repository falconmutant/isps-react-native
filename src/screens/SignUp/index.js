import React, {Component} from 'react'
import {ScrollView, ImageBackground} from "react-native";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import SignUpForm from './Form'
import Social from './Social'

import {Block, Button, Text, styles, COLORS, SIZES, actionsReducers} from '../../layout'


class SignUp extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
    };

    render() {
        const { navigation } = this.props;
        return (
            <ImageBackground source={require('../../assets/images/signup_background.jpeg')} style={styles.initBlock}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}>
                    <Block flex style={styles.formBlock} />
                    <Block flex center space="evenly">
                        <Button color="transparent" shadowless  onPress={() => navigation.navigate('SignIn')}>
                            <Text center color={COLORS.MATERIAL_ERROR} size={SIZES.FONT * 0.75}>
                                {"¿Ya tienes una cuenta? Ingresa"}
                            </Text>
                        </Button>
                    </Block>
                    <Social />
                    <SignUpForm {...this.props} />
                    <Block flex style={styles.formBlock} />
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (values) => {
        dispatch({ type: actionsReducers.REGISTER, payload: values });
    },
});

export default connect(null, mapDispatchToProps)(SignUp);