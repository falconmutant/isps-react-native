import React, { Component } from 'react'
import {Text, View } from 'react-native';
import { connect } from 'react-redux'
import { LocaleConfig, Agenda } from 'react-native-calendars'

import {Screen, styles, actionsReducers} from '../../layout'

const dataTabs = [
    {title: 'Eventos', icon: 'list', target: 'Events'},
    {title: 'Calendario', icon: 'calendar', target: 'Calendar'},
    {title: 'Categorias', icon: 'book', target: 'EventCategory'},
];

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
    dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';


class Calendar extends Component {
    state = {
        items: {},
    }

    componentWillMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getEvents();
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ events: nextProps.events });
    }

    loadItems(day){
        const {items} = this.state;
        this.props.events.map(event =>{
            const strTime = event.start.split('T')[0]
            !items[strTime] ?
            items[strTime] = [{
                name: event.name,
                text: event.description
            }] :
            items[strTime].push({
                name: event.name,
                text: event.description
            });
        });
        this.setState({ items });
        console.log(this.state.items, this.state.events);
    }

    renderItem = (item) => {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    };

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    };

    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    };


    render() {
        const {navigation} = this.props;
        return (
            <Screen
            tabs
            tabsData={dataTabs}
            title="Calendario"
            navigation={navigation}
            back
            noScroll={true}>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={new Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    style={styles.agenda}
                />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
