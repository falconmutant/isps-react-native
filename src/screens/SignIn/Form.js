import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Block, Button, Input, Text } from '../../themes/galio'
import { COLORS, SIZES } from './styles'



const InputField = (props) => {
    const {placeholder, password, width, input} = props;
    return(
        <Block flex={1}>
            <Input
                rounded
                type={'default'}
                password={!!password}
                viewPass={!!password}
                placeholder={placeholder}
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                onChangeText={input.onChange}
                onBlur={props.input.onBlur}
            />
            {props.meta.touched && props.meta.error && <Text color={COLORS.ERROR}>{props.meta.error}</Text>}
        </Block>
    )
};

class Form extends Component {
    render() {
        const { width, handleSubmit, login } = this.props;
        return (
            <Block flex={3} center space="evenly">
                <Block flex={1}>
                    <Field name='username' component={InputField} placeholder='Usuario' width={width}/>
                    <Field name='password' component={InputField} placeholder='Contraseña' width={width} password/>
                    <Text
                        color={COLORS.ERROR}
                        size={SIZES.FONT * 0.75}
                        style={{alignSelf: 'flex-end', lineHeight: SIZES.FONT * 2}}
                    >
                        ¿Olvidaste tu contraseña?
                    </Text>
                </Block>
                <Block flex middle>
                    <Button
                        round
                        color={COLORS.BLUE}
                        onPress={handleSubmit(login)}
                    >
                        Iniciar Sesión
                    </Button>
                </Block>
            </Block>
        )
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Usuario requerido';
    }

    if (!values.password) {
        errors.password = 'Contraseña requerida';
    } else if (values.password.length < 8) {
        errors.password = 'Contraseña invalida';
    }

    return errors;
};

export default reduxForm({ form: 'SignInForm', validate })(Form)
