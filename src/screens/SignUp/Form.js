import React, {Component} from 'react';
import {Block, Button, Input, Text} from '../../themes/galio'
import {Field, reduxForm} from 'redux-form'
import { materialTheme } from '../../themes/material'

const { COLORS } = materialTheme;

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
        const {width, handleSubmit, register, navigation } = this.props;
        return (
            <Block flex={3} center space="evenly">
                <Block flex={1}>
                    <Field name='firstName' component={InputField} placeholder='Nombre' width={width}/>
                    <Field name='lastName' component={InputField} placeholder='Paterno' width={width}/>
                    <Field name='username' component={InputField} placeholder='Usuario' width={width}/>
                    <Field name='email' component={InputField} placeholder='Correo' width={width}/>
                    <Field name='password' component={InputField} placeholder='Contraseña' width={width} password/>
                    <Field name='confirm' component={InputField} placeholder='Confirmar' width={width} password/>
                </Block>
                <Block flex middle>
                    <Button
                        round
                        color={COLORS.BLUE}
                        onPress={handleSubmit(register)}
                    >
                        Registrarse
                    </Button>
                    <Button
                        round
                        color={COLORS.TRANSPARENT}
                        onPress={() => navigation.navigate('SignIn')}
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

    if(values.confirm !== values.password){
        errors.confirm = 'Contraseña debe coincidir';
    }

    return errors;
};

export default reduxForm({ form: 'SignUpForm', validate })(Form)