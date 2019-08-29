import React, {Component} from 'react';
import {Block, Card, theme} from "../../../themes/galio";
import {Dimensions, ScrollView, StyleSheet, Text} from "react-native";
import Moment from 'react-moment';
import 'moment/locale/es'

const { width } = Dimensions.get('screen');


class CardEvents extends Component {
    render() {
        const {events} = this.props;
        const checkFilter = (d) => {
            if(parseInt(d) > 24) return `${parseInt(parseInt(d)/24)} días`;
            if(parseInt(d) < 24) return `${d} horas`;
            return ""
        };
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.events}>
                    {events.map(function (event, i) {
                        return(
                            <Card
                                key={i}
                                flex
                                borderless
                                shadowColor={theme.COLORS.BLACK}
                                style={styles.card}
                                title={event.name}
                                caption={<Moment element={Text} locale='es' fromNow>{event.start}</Moment>}
                                location={<Moment 
                                    element={Text} 
                                    locale='es' 
                                    diff={new Date(event.start)}
                                    unit="hours"
                                    filter={checkFilter}>
                                        {new Date(event.end)}
                                    </Moment>}
                                map={{
                                    lat: parseFloat(event.latitude),
                                    lng: parseFloat(event.longitude)
                                }}
                                avatar="http://i.pravatar.cc/100?id=skater"
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
    events: {
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

export default CardEvents;