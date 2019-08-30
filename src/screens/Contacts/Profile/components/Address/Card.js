import React, { Component } from 'react'
import {Card, theme} from "../../../../../themes/galio";
import {Dimensions, ScrollView, StyleSheet, Text} from "react-native";
import {url} from '../../../../../constants'

const { width } = Dimensions.get('screen');


export default class CardAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            address: this.props.contact.address,
            contact: this.props.contact,
        }
    }

    render() {
        const {contact, address} = this.state;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.address}>
                    {address.map(function (adrs, i) {
                        return(
                            <Card
                                key={i}
                                flex
                                borderless
                                shadowColor={theme.COLORS.BLACK}
                                style={styles.card}
                                title={adrs.name}
                                caption={`${adrs.street} ${adrs.number}`}
                                location={`${adrs.community} ${adrs.state}`}
                                map={{
                                    lat: parseFloat(adrs.latitude),
                                    lng: parseFloat(adrs.longitude)
                                }}
                                avatar={contact.image ? {uri: url(contact.image.image)} : require('../../../../../assets/images/avatar.png')}
                                imageStyle={styles.cardImageRadius}
                                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                            />
                        )
                    })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    address: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
    },
    cards: {
        flex: 1,
        backgroundColor: theme.COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card: {
        borderWidth: 0,
        backgroundColor: theme.COLORS.WHITE,
        width: width - theme.SIZES.BASE * 2,
        marginVertical: theme.SIZES.BASE * 0.875,
    },
    cardImageRadius: {
        borderRadius: theme.SIZES.BASE * 0.1875,
    },
});
