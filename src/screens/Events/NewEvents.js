import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Screen, BlockList, RowList, Field, Block, Button, styles, COLORS, SIZES, width, actionsReducers } from '../../layout'


class NewEvents extends Component {
    constructor(props){
        super(props);
        this.event = props.navigation.getParam('event', 'No event');
        this.state={
            form: [
                {
                    title: 'Datos del evento',
                    description: 'Nombre, Fecha, Evento Publico.',
                    inputs:[
                        {
                            name: 'name',
                            display: typeof this.event === 'object' ? this.event.name ? this.event.name : 'Nombre Evento' : 'Nombre Evento',
                            title: 'Nombre Evento',
                            subtitle: 'Ingresa un nombre para el evento',
                            placeholder: 'Nombre del evento',
                            input: 'Dialog',
                        },
                        {
                            name: 'start',
                            data: typeof this.event === 'object' ? this.event.start ? this.event.start : null : null,
                            input: 'Date',
                        },
                        {
                            name: 'end',
                            data: typeof this.event === 'object' ? this.event.end ? this.event.end : null : null,
                            input: 'Date',
                        },
                        {
                            name: 'isPublic',
                            display: 'Todo el día',
                            data: typeof this.event === 'object' ? this.event.isPublic : false,
                            input: 'Switch',
                        },
                    ]
                },
                {
                    title: 'Lugar del evento',
                    description: '',
                    inputs: [
                        {
                            name: 'address',
                            data:  {
                                latitude: typeof this.event === 'object' ? parseFloat(this.event.latitude) : 0,
                                longitude: typeof this.event === 'object' ? parseFloat(this.event.longitude) : 0,
                            },
                            find: typeof this.event === 'object' ? false : true,
                            input: 'Address',
                        }
                    ]
                },
                {
                    title: 'Configuración',
                    description: 'Notificaciones, Categoria, Extras.',
                    inputs: [
                        {
                            display: 'Notificaciones',
                            icon: 'bell',
                            onPress: () => props.navigation.navigate('No'),
                            input: 'Row',
                        },
                        {
                            display: 'Contactos',
                            icon: 'users',
                            onPress: () => props.navigation.navigate('No'),
                            input: 'Row',
                        },
                        {
                            display: 'Categorias',
                            icon: 'list',
                            onPress: () => props.navigation.navigate('No'),
                            input: 'Row',
                        },
                        {
                            display: 'Notas',
                            icon: 'file',
                            onPress: () => props.navigation.navigate('No'),
                            input: 'Row',
                        },
                        {
                            display: typeof this.event === 'object' ? 'Modificar' : 'Guardar',
                            onPress: typeof this.event === 'object' ? this.modifyEvent.bind(this) : this.saveEvent.bind(this),
                            input: 'Button',
                        },
                    ],
                }
            ],
            modify: typeof this.event === 'object' ? true : false,
            event: this.event,
        }
    }

    saveField = field => {
        const {event} = this.state;
        this.setState({
            data: {
                ...event,
                ...field,
            }
        })
    };

    saveEvent = e => {
        e.preventDefault();
        this.props.AddEvent(this.data);
    };

    modifyEvent = e => {
        e.preventDefault();
    }

    render() {
        const {form} = this.state;
        const {navigation} = this.props;
        return (
            <Screen
            back
            title="Nuevo Evento"
            navigation={navigation}>
                {form.map((block, i) => (
                    <BlockList key={i} title={block.title} description={block.description}>
                        <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                            {block.inputs.map((input, i) => (
                                <Field key={i} data={input} saveField={this.saveField} />
                            ))}
                        </Block>
                    </BlockList>
                ))}
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
    modifyEvent: (data) => {
        dispatch({
            type:actionsReducers.MODIFY_EVENT,
            payload: data,
        });
    },
});

export default connect(null, mapDispatchToProps)(NewEvents);
