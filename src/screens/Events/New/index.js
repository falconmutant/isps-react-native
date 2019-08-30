import React, {Component} from 'react'
import {StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Dimensions, FlatList, PermissionsAndroid, Alert} from 'react-native'
import {Block, Text, theme, Icon, Input, Card, Button} from '../../../themes/galio'
import { Header } from '../../../components/material'
import { materialTheme } from '../../../themes/material'
import DateTimePicker from 'react-native-modal-datetime-picker'
import MapView from 'react-native-maps'
import {connect} from 'react-redux'
import Geolocation from '@react-native-community/geolocation';

import Tabs from "../List/Tabs";
import {actionsReducers} from "../../../constants";


const { width, height } = Dimensions.get('screen');
const { COLORS, SIZES} = theme;

const ASPECT_RATIO = width / height;

const SAMPLE_REGION = {
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0055,
    longitudeDelta: 0.0055 * ASPECT_RATIO,
};

class NewEvent extends Component {
    DateToString = d => `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    async componentWillMount() {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Ubicación",
                message: "Esta aplicación quiere acceder a tu ubicación"
            }).then(() => {
                this.findCoordinates();
            });
        } else {
            this.findCoordinates();
        }
    }

    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                console.log(initialPosition)
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        
        this.watchID = Geolocation.watchPosition(position => {
            const lastPosition = JSON.stringify(position);
            console.log(lastPosition)
        });
    };

    constructor(props){
        super(props);
        this.saveEvent = this.saveEvent.bind(this);
        this.state = {
            Name: '',
            StartDateVisible: false,
            EndDateVisible: false,
            StartDateObject: new Date(),
            EndDateObject: new Date(),
            StartDate: this.DateToString(new Date()),
            EndDate: this.DateToString(new Date()),
            initialPosition: '',
            lastPosition: '',
        };
    }

    saveEvent = e => {
        e.preventDefault();
        const sd = this.state.StartDateObject;
        const ed = this.state.EndDateObject;
        this.props.AddEvent({
            data: {
                user: this.props.user.id,
                name: this.state.Name,
                startDate: sd.toJSON().split('T')[0],
                timeStart: sd.toJSON().split('T')[1],
                endDate: ed.toJSON().split('T')[0],
                timeEnd: ed.toJSON().split('T')[1],
                description: 'Descripción generada automaticamente',
            },
            token: this.props.token,
        });
    };


    renderTabs = () => <Tabs {...this.props} />;

    toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

    showStartDateTimePicker = () => {
        this.setState({ StartDateVisible: true });
    };

    hideStartDateTimePicker = () => {
        this.setState({ StartDateVisible: false });
    };

    showEndDateTimePicker = () => {
        this.setState({ EndDateVisible: true });
    };

    hideEndDateTimePicker = () => {
        this.setState({ EndDateVisible: false });
    };

    HandlerStartDate = date => this.setState({
        StartDate: this.DateToString(date),
        StartDateObject: date,
        StartDateVisible: false
    });

    HandlerEndDate = date => this.setState({
        EndDate: this.DateToString(date),
        EndDateObject: date,
        EndDateVisible: false
    });

    onChange = e => {
        this.setState({Name: e});
    };

    renderItem = ({ item }) => {
        const {navigate} = this.props.navigation;
        switch(item.type) {
            case 'input':
                return (
                    <Block row middle space="between" style={styles.rows}>
                        <Input
                            rounded
                            type={'default'}
                            placeholder={item.title}
                            style={{width: width - SIZES.BASE * 4}}
                            onChangeText={this.onChange}
                            name={'Name'}
                            value={this.state.Name}
                        />
                    </Block>
                );
            case 'settings':
                return (
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <Block row middle space="between" style={styles.rows}>
                            <Text size={14}>{'Todo le día'}</Text>
                            <Switch
                                onValueChange={() => this.toggleSwitch('all-day')}
                                ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
                                thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
                                trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
                                value={this.state['all-day']}
                            />
                        </Block>
                        <Block style={styles.rows}>
                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>{this.state.StartDate}</Text>
                                    <Icon name="chevron-right" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                                <DateTimePicker
                                    isVisible={this.state.StartDateVisible}
                                    onConfirm={this.HandlerStartDate}
                                    onCancel={this.hideStartDateTimePicker}
                                    mode={'datetime'}
                                />
                            </TouchableOpacity>
                        </Block>
                        <Block style={styles.rows}>
                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>{this.state.EndDate}</Text>
                                    <Icon name="chevron-right" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                                <DateTimePicker
                                    isVisible={this.state.EndDateVisible}
                                    onConfirm={this.HandlerEndDate}
                                    onCancel={this.hideEndDateTimePicker}
                                    mode={'datetime'}
                                />
                            </TouchableOpacity>
                        </Block>
                        <Block row middle space="between" style={styles.rows}>
                            <Text size={14}>{'Evento Publico'}</Text>
                            <Switch
                                onValueChange={() => this.toggleSwitch('public-event')}
                                ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
                                thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
                                trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
                                value={this.state['public-event']}
                            />
                        </Block>
                    </Block>
                );
            case 'location':
                return (
                    <Block shadow style={styles.card}>
                        <Block card style={styles.mapBlock}>
                            <MapView
                                liteMode
                                key={'map-0'}
                                style={styles.map}
                                initialRegion={SAMPLE_REGION}
                            />
                        </Block>
                    </Block>
                );
            case 'extra':
                return (
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <Block style={styles.rows}>
                            <TouchableOpacity>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>Notificaciones</Text>
                                    <Icon name="bell" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
                        <Block style={styles.rows}>
                            <TouchableOpacity>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>Contactos</Text>
                                    <Icon name="users" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
                        <Block style={styles.rows}>
                            <TouchableOpacity>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>Categoria</Text>
                                    <Icon name="list" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
                        <Block style={styles.rows}>
                            <TouchableOpacity>
                                <Block row middle space="between" style={{paddingTop:7}}>
                                    <Text size={14}>Notas</Text>
                                    <Icon name="file" family="font-awesome" style={{ paddingRight: 5 }} />
                                </Block>
                            </TouchableOpacity>
                        </Block>
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
                );
            default:
                break;
        }
    };

    renderView = () => {
        const recommended = [
            { title: "Nombre", id: "name", type: "input" },
            { id: "settings", type: "settings" },
        ];
        const location = [
            { id: "location-event", type: "location" },
        ];
        const settings = [
            { id: "conf-event", type: "extra" },
        ];

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.settings}>
                <FlatList
                    data={recommended}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ListHeaderComponent={
                        <Block style={styles.title}>
                            <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                                Datos del evento
                            </Text>
                            <Text center muted size={12}>
                                Nombre, Hora, Publico.
                            </Text>
                        </Block>
                    }
                />

                <FlatList
                    data={location}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ListHeaderComponent={
                        <Block style={styles.title}>
                            <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                                Lugar del evento
                            </Text>
                            <Text center muted size={12}>
                            </Text>
                        </Block>
                    }
                />

                <FlatList
                    data={settings}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.renderItem}
                    ListHeaderComponent={
                        <Block style={styles.title}>
                            <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                                Configuración
                            </Text>
                            <Text center muted size={12}>
                                Notificaciones, Categoria, Extras
                            </Text>
                        </Block>
                    }
                />
            </ScrollView>
        )
    };

    render() {
        const {navigation} = this.props;
        return (
            <Block flex center style={styles.home}>
                <Header back title=" Nuevo Evento" navigation={navigation} renderTabs={this.renderTabs()} />
                {this.renderView()}
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    home: {
        width: width,
    },
    content: {
        width: width,
    },
    settings: {
        width: width - SIZES.BASE * 2,
        paddingVertical: SIZES.BASE * 2,
    },
    title: {
        paddingTop: SIZES.BASE,
        paddingBottom: SIZES.BASE / 2,
    },
    rows: {
        height: SIZES.BASE * 2,
        paddingHorizontal: SIZES.BASE,
        marginBottom: SIZES.BASE / 2,
    },
    map: {
        width: 'auto',
        height: SIZES.CARD_IMAGE_HEIGHT,
    },
    card: {
        borderWidth: 0,
        backgroundColor: COLORS.WHITE,
        width: SIZES.CARD_WIDTH,
        marginVertical: SIZES.CARD_MARGIN_VERTICAL,
        borderRadius: SIZES.CARD_ROUND,
    },
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: SIZES.CARD_FOOTER_HORIZONTAL,
        paddingVertical: SIZES.CARD_FOOTER_VERTICAL,
        backgroundColor: COLORS.TRANSPARENT,
        zIndex: 1,
    },
    title2: {
        justifyContent: 'center',
    },
    avatar: {
        width: SIZES.CARD_AVATAR_WIDTH,
        height: SIZES.CARD_AVATAR_HEIGHT,
        borderRadius: SIZES.CARD_AVATAR_RADIUS,
    },
    mapBlock: {
        borderWidth: 0,
        overflow: 'hidden',
    },
    round: {
        borderRadius: SIZES.CARD_ROUND,
    },
    rounded: {
        borderRadius: SIZES.CARD_ROUNDED,
    },
});

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    AddEvent: (data) => {
        dispatch({
            type: actionsReducers.SAVE_EVENT,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);