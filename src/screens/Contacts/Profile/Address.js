import React, { Component } from 'react'
import { TouchableOpacity} from "react-native";

import {Screen, Card, Dialog, styles, COLORS, SIZES, url } from '../../../layout'


export default class Address extends Component {
    constructor(props){
        super(props);
        this.contact = props.navigation.getParam('contact', 'No contact');
        this.state= {
            actions: [
                {
                    text: "Nuevo",
                    icon: require("../../../assets/images/event.png"),
                    name: "bt_new",
                    position: 1
                },
            ],
            contact: this.contact,
            address: this.contact.address,
        }
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ address: this.contact.address });
        } else {
            const {address} = this.contact.address;
            const matching = [];
            address.map(adrs =>{
                const all_adrs = `${adrs.name} ${adrs.street} ${adrs.number} ${adrs.community}`;
                if(all_adrs.indexOf(text) >= 0) matching.push(adrs);
            });
            this.setState({ address: matching });
        }
    }

    addAddrs = address => this.setState({ address });

    render() {
        const {navigation} = this.props;
        const {actions, address, contact} = this.state;
        return (
            <Screen
            back
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar por (nombre, calle, numero, etc)'
            title="Direcciones"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={name => name === 'bt_new' ? navigation.navigate('NewAddress', {
                    contact,
                    addAddrs: this.addAddrs.bind(this),
                }) : null}>
                {address.map((adrs, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('NewAddress', {contact, address: adrs})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            title={adrs.name}
                            caption={`${adrs.street} ${adrs.number}`}
                            location={`${adrs.community} ${adrs.state}`}
                            map={true}
                            dataMap={{
                                lat: parseFloat(adrs.latitude),
                                lng: parseFloat(adrs.longitude)
                            }}
                            avatar={contact.image ? {uri: url(contact.image.image)} : require('../../../assets/images/avatar.png')}
                            imageStyle={styles.cardImageRadius}
                            imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                        />
                    </TouchableOpacity>
                ))}
            </Screen>
        )
    }
}
