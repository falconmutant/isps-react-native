import React, {Component} from 'react'
import { Block, Button, Text } from '../../themes/galio'
import SignUpForm from './Form'
import styles, { width, COLORS, SIZES } from './styles'
import { actionsReducers } from '../../constants'
import Social from './Social'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {ScrollView, ImageBackground} from "react-native";

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
                    contentContainerStyle={styles.event}>
                    <Block flex style={styles.formBlock} />
                    <Block flex center space="evenly">
                        <Button color="transparent" shadowless  onPress={() => navigation.navigate('SignIn')}>
                            <Text center color={COLORS.ERROR} size={SIZES.FONT * 0.75}>
                                {"¿Ya tienes una cuenta? Ingresa"}
                            </Text>
                        </Button>
                    </Block>
                    <Social />
                    <SignUpForm {...this.props} width={width} />
                    <Block flex style={styles.formBlock} />
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    register: (values) => {
        dispatch({ type: actionsReducers.REGISTER, payload: values});
    },
});

export default connect(null, mapDispatchToProps)(SignUp);