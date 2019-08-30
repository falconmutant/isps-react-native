import React, {Component} from 'react'
import { ScrollView, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { Block, Button, Text } from '../../themes/galio'
import SignInForm from "./Form";
import Social from './Social'
import { actionsReducers } from '../../constants'
import styles, { width, COLORS, SIZES } from './styles'
import PropTypes from "prop-types";


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
            <ImageBackground source={require('../../assets/images/signin_background.png')} style={styles.initBlock}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.events}>
                    <Block flex style={styles.formBlock} />
                    <SignInForm {...this.props} width={width} />
                    <Social />
                    <Block flex center space="evenly">
                        <Button color="transparent" shadowless  onPress={() => navigation.navigate('SignUp')}>
                            <Text center color={COLORS.ERROR} size={SIZES.FONT * 0.75}>
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