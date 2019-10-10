import React, { Component } from 'react'
import { Platform, PermissionsAndroid, TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import  MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import PropTypes from 'prop-types';

import { Block, styles, width, height } from '../../../layout'


export default class FieldAddress extends Component {
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            error: null
        };
    }
      

    async componentDidMount() {
        this.mounted = true;
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: "Ubicación",
                message: "Esta aplicación requiere acceder a tu ubicación"
            }).then(() => {
                this.findCoordinates();
            });
        } else {
            this.findCoordinates();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.watchID) Geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        this.state.region.setValue(region);
    }

    findCoordinates = () => {
        this.watchID = Geolocation.watchPosition(position => {
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude);
            this.setState({ latitude, longitude});
        });
        
        console.log(this.state);
    };

    setRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0055,
        longitudeDelta: 0.0055
    });

    render() {
        const {navigation, saveField} = this.props;
        return (
            <Block>
                <TouchableOpacity onPress={() => navigation.navigate('EventMap', {
                        location: this.state,
                        saveField: saveField.bind(this),
                    })}>
                    <Block shadow style={styles.card}>
                        <Block card style={styles.mapBlock}>
                            <MapView
                                liteMode
                                key={'map-0'}
                                style={styles.map}
                                region={this.setRegion()}
                            />
                        </Block>
                    </Block>
                </TouchableOpacity>
            </Block>
        )
    }
}
