import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Screen, BlockList, Block, FieldInput, FieldAddress, Button, styles, width, COLORS, SIZES, actionsReducers } from '../../../layout'


class NewAddress extends Component {
    constructor(props){
        super(props);
        this.contact = props.navigation.getParam('contact', 'No contact');
        this.address = props.navigation.getParam('address', 'No address');
        console.log(this.address);
        this.state = {
            contact: this.contact,
            inputs:[
                {
                    input: 'name',
                    display: typeof this.address === 'object' ? this.address.name ? this.address.name : 'Nombre Direccíon' : 'Nombre Direccíon',
                    title: 'Nombre Dirección',
                    subtitle: 'Ingresa un nombre para la dirección',
                    placeholder: 'Nombre de la Dirección',
                },
                {
                    input: 'street',
                    display: typeof this.address === 'object' ? this.address.street ? this.address.street : 'Nombre Calle'  : 'Nombre Calle',
                    title: 'Nombre Calle',
                    subtitle: 'Ingresa nombre de la calle',
                    placeholder: 'Nombre de calle',
                },
                {
                    input: 'number',
                    display: typeof this.address === 'object' ? this.address.number ? this.address.number : 'Número y/o Apartamento' : 'Número y/o Apartamento',
                    type: 'number-pad',
                    title: 'Número Ext y/o Int',
                    subtitle: 'Ingresa número de la dirección',
                    placeholder: 'Número',
                },
                {
                    input: 'community',
                    display: typeof this.address === 'object' ? this.address.community ? this.address.community : 'Colonia' : 'Colonia',
                    title: 'Colonia',
                    subtitle: 'Ingresa la Colonia',
                    placeholder: 'Colonia',
                },
                {
                    input: 'zipCode',
                    display: typeof this.address === 'object' ? this.address.zipCode ? this.address.zipCode : 'Codigo Postal' : 'Codigo Postal',
                    type: 'decimal-pad',
                    title: 'Codigo Postal',
                    subtitle: 'Ingresa codigo postal',
                    placeholder: 'Codigo Postal',
                },
                {
                    input: 'city',
                    display: typeof this.address === 'object' ? this.address.city ? this.address.city : 'Ciudad' : 'Ciudad',
                    title: 'Ciudad',
                    subtitle: 'Ingresa la Ciudad',
                    placeholder: 'Ciudad',
                },
                {
                    input: 'state',
                    display: typeof this.address === 'object' ? this.address.state ? this.address.state : 'Estado' : 'Estado',
                    title: 'Estado',
                    subtitle: 'Ingresa el Estado',
                    placeholder: 'Estado',
                },
                {
                    input: 'country',
                    display: typeof this.address === 'object' ? this.address.country ? this.address.country : 'País' : 'País',
                    title: 'País',
                    subtitle: 'Ingresa el País',
                    placeholder: 'País',
                },
            ],
            data: typeof this.address === 'object' ? {...this.address} : {},
        }
    }

    saveField = field => {
        const {data} = this.state;
        console.log(data);
        this.setState({
            data: {
                ...data,
                ...field,
            }
        })
    }

    saveAddress = () => {
        const {contact, data} = this.state;
        console.log(data);
        let addrs = contact.address;
        addrs.push(data);
        console.log(data);
        this.props.changeProfile({
            id: contact.id,
            address: addrs,
        });
        this.props.navigation.state.params.addAddrs(addrs);
        this.props.navigation.goBack();
    }

    render() {
        const {inputs} = this.state;
        const {navigation} = this.props;
        return (
            <Screen
            back
            title="Nueva Dirección"
            navigation={navigation}>
                <BlockList title='Datos de la Dirección' description='Nombre, Ciudad, Estado.'>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        {inputs.map((input, i) =>(
                            <FieldInput dialog key={i} data={input} saveField={this.saveField} />
                        ))}
                        {
                            typeof this.address === 'object' ?
                                <FieldAddress 
                                navigation={navigation} 
                                saveField={this.saveField} 
                                region={true}
                                latitude={this.address.latitude}
                                longitude={this.address.longitude} /> : 
                                <FieldAddress 
                                navigation={navigation} 
                                saveField={this.saveField}
                                region={false} />
                        }
                        <Block style={[styles.rows, {marginTop: SIZES.BASE}]}>
                            <Button
                                round
                                color={COLORS.BLUE}
                                onPress={this.saveAddress}
                                style={{width: width - SIZES.BASE * 4}}
                            >
                                Guardar
                            </Button>
                        </Block>
                    </Block>
                </BlockList>
            </Screen>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeProfile: (data) => {
        dispatch({
            type: actionsReducers.MODIFY_PROFILE_CONTACT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(NewAddress)
