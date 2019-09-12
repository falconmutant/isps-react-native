import React, {Component} from 'react'
import { ScrollView, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

import { Block, Button, Text, styles, COLORS, SIZES, Files, actionsReducers} from '../../layout'

import SignInForm from "./Form";
import Social from './Social'


class SignIn extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return (
            <ImageBackground source={Files.SignIn} style={styles.initBlock}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}>
                    <Block flex style={styles.formBlock} />
                    <SignInForm {...this.props} />
                    <Social />
                    <Block flex center space="evenly">
                        <Button color="transparent" shadowless  onPress={() => navigation.navigate('SignUp')}>
                            <Text center color={COLORS.MATERIAL_ERROR} size={SIZES.FONT * 0.75}>
                                {"¿No tienes una cuenta? Regístrate"}
                            </Text>
                        </Button>
                    </Block>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    login: (values) => {
        dispatch({ type: actionsReducers.LOGIN, payload: values});
    },
});

export default connect(null, mapDispatchToProps)(SignIn);