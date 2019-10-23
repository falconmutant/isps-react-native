import React, { Component } from 'react'
import { TouchableOpacity, Text} from "react-native";
import { connect } from 'react-redux'
import Moment from 'react-moment';
import 'moment/locale/es'

import {Screen, Card, Dialog, Input, styles, width, COLORS, SIZES, actionsReducers} from '../../layout'



const dataTabs = [
    {title: 'Eventos', icon: 'list', target: 'Events'},
    {title: 'Calendario', icon: 'calendar', target: 'Calendar'},
    {title: 'Categorias', icon: 'book', target: 'EventCategory'},
];

const actions = [
    {
        text: "Evento",
        icon: require('../../assets/images/event.png'),
        name: "bt_event",
        position: 2
    },
    {
        text: "Categoria",
        icon: require('../../assets/images/catalog.png'),
        name: "bt_catalog",
        position: 1
    }
];


class Events extends Component {
    state = {
        data: [],
        visible: false,
        value: '',
    }

    componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getEvents();
                this.setState({ data: this.props.events});
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.events});
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ data: this.props.events });
        } else {
            const {events} = this.props;
            const matching = [];
            events.map(event =>{
                if(event.name.indexOf(text) >= 0) matching.push(event)
            });
            this.setState({ data: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_event') ? navigation.navigate('NewEvent') : this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: '',
            value:''
        });
    }

    onConfirm = () => {
        const {value} = this.state;
        this.props.saveCategory({
            category: value
        });
        this.setState({ visible: false, value: '' })
    }

    render() {
        const {navigation, events} = this.props;
        const {data, visible, value} = this.state;
        const checkFilter = (d) => {
            if(parseInt(d) > 24) return `${parseInt(parseInt(d)/24)} días`;
            if(parseInt(d) < 24) return `${d} horas`;
            return ""
        };
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar evento.'
            tabs
            tabsData={dataTabs}
            title="Eventos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {data.map((event, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('NewEvent', {event})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            map={true}
                            dataMap={{
                                lat: parseFloat(event.latitude),
                                lng: parseFloat(event.longitude),
                                key: i,
                            }}
                            footer={true}
                            title={event.name}
                            caption={<Moment element={Text} locale='es' fromNow>{event.start}</Moment>}
                            location={<Moment 
                                element={Text} 
                                locale='es' 
                                diff={new Date(event.start)}
                                unit="hours"
                                filter={checkFilter}>
                                    {new Date(event.end)}
                                </Moment>}
                            avatar={{uri: "http://i.pravatar.cc/100?id=skater"}}
                            imageStyle={styles.cardImageRadius}
                            imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                        />
                    </TouchableOpacity>
                ))}
                <Dialog 
                    visible={visible}
                    title='Categoria'
                    subtitle='Ingresa nueva categoria.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'Nombre de la categoria'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({value: e})}
                        value={value}
                    />
                </Dialog>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    events: state.event.events,
});

const mapDispatchToProps = dispatch => ({
    getEvents: () => {
        dispatch({ type: actionsReducers.GET_EVENTS });
    },
    saveCategory: (data) => {
        dispatch({
            type: actionsReducers.SAVE_CATEGORY,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
