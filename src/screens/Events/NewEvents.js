import React, { Component } from 'react'
import {connect} from 'react-native'
import {Screen, BlockList, RowList, Block, FieldName, FieldDate, FieldPublic, FieldAddress, styles, COLORS, SIZES, width } from '../../layout'


class NewEvents extends Component {
    constructor(props){
        super(props);
        this.state={
            name: null,
            start: null,
            end: null,
            isPublic: null,
        }
    }

    saveField = field => this.setState(field);

    saveEvent = e => {
        e.preventDefault();
        this.props.AddEvent(this.state);
    };

    render() {
        return (
            <Screen
            back
            title="Nuevo Evento"
            navigation={navigation}>
                <BlockList title='Datos del evento' description='Nombre, Fecha, Publico.'>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <FieldName saveField={this.saveField} field={this.state} />
                        <FieldDate name='start' saveField={this.saveField} field={this.state} />
                        <FieldDate name='end' saveField={this.saveField} field={this.state} />
                        <FieldPublic saveField={this.saveField} field={this.state} />
                    </Block>
                </BlockList>
                <BlockList title='Lugar del evento' description=''>
                    <FieldAddress saveField={this.saveField} field={this.state} />
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
