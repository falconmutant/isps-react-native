import React, {Component} from 'react';
import {Card, Icon, theme} from "../../../../../themes/galio";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from "react-native";

const { width } = Dimensions.get('screen');


class CardPhone extends Component {
    constructor(props){
        super(props);
        this.state={
            phones: this.props.contact.phone,
        }
    }

    Delete = pos =>{
        const {phones} = this.state;
        this.setState({
            phones: phones.splice(pos, phones.length),
        });
        this.props.changeProfile({
            id: this.props.contact.id,
            phone: phones.splice(pos, phones.length),
        });
    };

    render() {
        const {phones} = this.state;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.phone}>
                    {phones.map(function (phone, i) {
                        return(
                            <Card
                                key={i}
                                flex
                                borderless
                                shadowColor={theme.COLORS.BLACK}
                                style={styles.card}
                                title={`(${phone.areaCode}) - ${phone.phoneNumber}`}
                                location={
                                    <TouchableOpacity onPress={(i)=> this.Delete}>
                                        <Icon name="trash" family="font-awesome" style={{ paddingRight: 5 }} />
                                    </TouchableOpacity>
                                }
                                caption={phone.phoneType}
                                avatar={require('../../../../../assets/images/phone.png')}
                                imageStyle={styles.cardImageRadius}
                                imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                            />
                        )
                    })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    phone: {
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

export default CardPhone;