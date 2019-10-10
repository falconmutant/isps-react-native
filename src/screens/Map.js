import React, { Component } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import {Screen, styles, width, height} from '../layout'

let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

export default class Map extends Component {
    constructor(props){
        super(props);
        const location = props.navigation.getParam('location', 'location');
        this.state={
            latitude: typeof location === 'object' ? location.latitude : 0,
            longitude: typeof location === 'object' ? location.longitude : 0,
            markers: [],
        }
    }

    async componentdidMount() {
        this.mounted = true;
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Ubicación",
                message: "Esta aplicación requiere acceder a tu ubicación"
            }).then(() => {});
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.watchID) Geolocation.clearWatch(this.watchID);
    }

    findCoordinates = () => {
        this.watchID = Geolocation.watchPosition(position => {
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude);
            this.setState({ latitude, longitude});
        });
        
        console.log(this.state);
    };

    setRegion = e => (e ? e : {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0055,
        longitudeDelta: 0.0055
    });

    onMapPress(e) {
        this.setState({
            markers: [
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
        const {latitude, longitude} = e.nativeEvent.coordinate;
        this.props.navigation.state.params.saveField({latitude, longitude});
    }

    log(eventName, e) {
        console.log(eventName, e.nativeEvent);
        this.onMapPress(e);
    }

    onChangeRegion(e){
        console.log('changeRegion', e);
    }

    render() {
        const {markers} = this.state;
        const {navigation, provider} = this.props;
        return (
            <Screen
            back
            noScroll = {true}
            title="Lugar"
            navigation={navigation}>
                <MapView
                    provider={provider}
                    style={styles.mapFull}
                    initialRegion={this.setRegion()}
                    onPress={e => this.onMapPress(e)}
                    onRegionChange={e => this.setRegion(e)}
                >
                    {markers.map(marker => (
                        <Marker
                        key={marker.key}
                        coordinate={marker.coordinate}
                        pinColor={marker.color}
                        />
                    ))}
                </MapView>
            </Screen>
        )
    }
}

Map.propTypes = {
    provider: ProviderPropType,
};
