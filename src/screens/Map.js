import React, { Component } from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import {Screen, styles, width, height} from '../layout'

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state={
            region: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.0055,
                longitudeDelta: 0.0055 * (width / height),
            },
            coordinates: ''
        }
    }

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
        const {region} = this.state;
        const _this = this;
        this.watchID != null && Geolocation.clearWatch(this.watchID, region, _this);
    }

    findCoordinates = () => {
        const {region} = this.state;
        const _this = this;
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                console.log(initialPosition);
                const {latitude, longitude} = initialPosition;
                _this.setState({
                    region: {
                        ...region,
                        latitude,
                        longitude
                    }
                });
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        
        this.watchID = Geolocation.watchPosition((position, region, _this) => {
            const lastPosition = JSON.stringify(position);
            console.log(lastPosition)
            const {latitude, longitude} = lastPosition;
            _this.setState({
                region: {
                    ...region,
                    latitude,
                    longitude
                }
            });
        });
    }

    onMapPress(e){
        this.setState({ coordinates: e.nativeEvent.coordinate})
    }

    log(eventName, e) {
        console.log(eventName, e.nativeEvent);
        this.setState({ coordinates: e.nativeEvent.coordinate})
    }

    render() {
        const {region, coordinate} = this.state;
        const {navigation, provider} = this.props;
        return (
            <Screen
            back
            title="Lugar"
            navigation={navigation}>
                <MapView
                    provider={provider}
                    style={styles.map}
                    initialRegion={region}
                    onPress={e => this.onMapPress}
                >
                    <Marker
                        coordinate={coordinate}
                        onSelect={e => log('onSelect', e)}
                        onDrag={e => log('onDrag', e)}
                        onDragStart={e => log('onDragStart', e)}
                        onDragEnd={e => log('onDragEnd', e)}
                        onPress={e => log('onPress', e)}
                        draggable
                    />
                </MapView>
            </Screen>
        )
    }
}

Map.propTypes = {
    provider: ProviderPropType,
};
