import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Screen, BlockList, RowList, Block, Button, styles, COLORS, SIZES, width, actionsReducers } from '../../layout'

import { FieldName, FieldDate, FieldPublic, FieldAddress } from './fields'


class NewEvents extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    saveField = field => {
        this.setState(field);
        console.log(field, this.state);
    };

    saveEvent = e => {
        e.preventDefault();
        this.props.AddEvent(this.state);
    };

    render() {
        const {navigation} = this.props;
        return (
            <Screen
            back
            title="Nuevo Evento"
            navigation={navigation}>
                <BlockList title='Datos del evento' description='Nombre, Fecha, Publico.'>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <FieldName saveField={this.saveField} fields={this.state} />
                        <FieldDate name='start' saveField={this.saveField} fields={this.state} />
                        <FieldDate name='end' saveField={this.saveField} fields={this.state} />
                        <FieldPublic saveField={this.saveField} fields={this.state} />
                    </Block>
                </BlockList>
                <BlockList title='Lugar del evento' description=''>
                    <FieldAddress navigation={navigation} saveField={this.saveField} fields={this.state} />
                </BlockList>
                <BlockList title='Configuración' description='Notificaciones, Categoria, Extras.'>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <RowList display='Notificaciones' icon='bell' onPress={() => navigation.navigate('No')} />
                        <RowList display='Contactos' icon='users' onPress={() => navigation.navigate('No')} />
                        <RowList display='Categorias' icon='list' onPress={() => navigation.navigate('No')} />
                        <RowList display='Notas' icon='file' onPress={() => navigation.navigate('No')} />
                        <Block style={[styles.rows, {marginTop: SIZES.BASE}]}>
                            <Button
                                round
                                color={COLORS.BLUE}
                                onPress={this.saveEvent}
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
    AddEvent: (data) => {
        dispatch({
            type: actionsReducers.SAVE_EVENT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(NewEvents);
