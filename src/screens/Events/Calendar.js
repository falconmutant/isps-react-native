import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LocaleConfig, Agenda } from 'react-native-calendars'

import {Screen, styles} from '../../layout'

const dataTabs = [
    {title: 'Eventos', icon: 'list', target: 'Events'},
    {title: 'Calendario', icon: 'calendar', target: 'Calendar'},
    {title: 'Categorias', icon: 'book', target: 'Category'},
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
    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getEvents();
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    loadItems(day){
        const items = [];
        this.props.events.map(event =>{
            const strTime = event.split('T')[0]
            !items[strTime] ? 
            items.push({strTime: [{ name: event.name, text: event.description }]}) : 
            items[strTime].push({ name: event.name, text: event.description}) ;
        });
        this.setState({ events: items });
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
            navigation={navigation}>
                <Agenda
                    items={this.state.events}
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
