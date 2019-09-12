import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'

import {Block, Button, Input, Text, width, COLORS, SIZES} from '../../layout'


const InputField = (props) => {
    const {placeholder, password, input} = props;
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
            {props.meta.touched && props.meta.error && <Text color={COLORS.MATERIAL_ERROR}>{props.meta.error}</Text>}
        </Block>
    )
};

class Form extends Component {
    render() {
        const { handleSubmit, register } = this.props;
        return (
            <Block flex={3} center space="evenly">
                <Block flex={1}>
                    <Field name='firstName' component={InputField} placeholder='Nombre' />
                    <Field name='lastName' component={InputField} placeholder='Paterno' />
                    <Field name='username' component={InputField} placeholder='Usuario' />
                    <Field name='email' component={InputField} placeholder='Correo' />
                    <Field name='password' component={InputField} placeholder='Contraseña' password/>
                    <Field name='confirm' component={InputField} placeholder='Confirmar' password/>
                </Block>
                <Block flex middle style={{marginTop: SIZES.BASE}}>
                    <Button
                        round
                        color={COLORS.BLUE}
                        onPress={handleSubmit(register)}
                    >
                        Registrarse
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