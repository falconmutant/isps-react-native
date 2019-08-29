import React, { Component } from 'react'
import { View } from 'react-native'
import { LocaleConfig, Agenda } from 'react-native-calendars'
import { Block, Button, Icon, Input, Text } from '../../../themes/galio'
import { Header } from "../../../components/material"
import styles, { COLORS } from './styles'

LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
    dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    renderSearch = () => {
        const { navigation } = this.props;
        const iconSearch = <Icon size={16} color={COLORS.MUTED} name="search" family="font-awesome" />;

        return (
            <Input
                right
                color="black"
                style={styles.search}
                iconContent={iconSearch}
                placeholder="Buscar evento"
                onFocus={() => navigation.navigate('Search')}
            />
        )
    };

    renderTabs = () => {
        const { navigation } = this.props;

        return (
            <Block row style={styles.tabs}>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Events')}>
                    <Block row middle>
                        <Icon name="list" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Eventos</Text>
                    </Block>
                </Button>
                <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Calendar')}>
                    <Block row middle>
                        <Icon name="calendar" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Calendario</Text>
                    </Block>
                </Button>
                <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Catalog')}>
                    <Block row middle>
                        <Icon size={16} name="book" family="font-awesome" style={{ paddingRight: 8 }} />
                        <Text size={16} style={styles.tabTitle}>Catalogo</Text>
                    </Block>
                </Button>
            </Block>
        )
    };

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header search tabs title="Eventos" navigation={navigation} renderTabs={this.renderTabs()} renderSearch={this.renderSearch()} />
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={new Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    style={styles.agenda}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            </Block>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
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

    timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };
}

export default Calendar;