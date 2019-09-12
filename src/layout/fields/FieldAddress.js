import React, { Component } from 'react'
import { Platform, PermissionsAndroid, TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps'

import { Block, styles, width, height } from '../index'

export default class FieldAddress extends Component {

    constructor(props){
        super(props);
        this.state={
            location: {
                latitude: 0.0,
                longitude: 0.0,
                latitudeDelta: 0.0055,
                longitudeDelta: 0.0055 * (width / height),
            }
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
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }

    findCoordinates = () => {
        const {location} = this.state;
        const _this = this;
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                console.log(initialPosition);
                const {latitude, longitude} = initialPosition;
                _this.setState({
                    location: {
                        ...location,
                        latitude,
                        longitude
                    }
                });
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
        
        this.watchID = Geolocation.watchPosition(position => {
            const {location} = this.state;
            const lastPosition = JSON.stringify(position);
            console.log(lastPosition)
            const {latitude, longitude} = lastPosition;
            _this.setState({
                location: {
                    ...location,
                    latitude,
                    longitude
                }
            });
        });
    };

    render() {
        const {navigation} = this.props;
        const {location} = this.state;
        return (
            <Block>
                <TouchableOpacity onPress={() => navigation.navigate('Map', {location})}>
                    <Block shadow style={styles.card}>
                        <Block card style={styles.mapBlock}>
                            <MapView
                                liteMode
                                key={'map-0'}
                                style={styles.map}
                                initialRegion={location}
                            />
                        </Block>
                    </Block>
                </TouchableOpacity>
            </Block>
        )
    }
}
