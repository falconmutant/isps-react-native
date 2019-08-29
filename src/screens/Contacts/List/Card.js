import React, { Component } from 'react';
import { Block, Card } from "../../../themes/galio";
import { ScrollView, TouchableWithoutFeedback, Text } from "react-native";
import PropTypes from 'prop-types'
import styles, { COLORS, SIZES } from './styles'
import Moment from 'react-moment';
import 'moment/locale/es'


class CardContact extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
    };

    

    render() {
        const {contacts, navigation} = this.props;

        const removeFilter = (d) => {
            if(d.split(" ").length > 0) return `${d.split(" ")[1]} ${d.split(" ")[2]}`;
            return ""
        };

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardContacts}>
                <Block flex space="between" style={styles.cards}>
                    {contacts.map(function (contact, i) {
                        return(
                            <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('Profile',{contact})}>
                                <Card
                                    flex
                                    borderless
                                    shadowColor={COLORS.BLACK}
                                    style={styles.card}
                                    title={contact.fullName}
                                    caption={<Moment element={Text} filter={removeFilter} locale='es' toNow>{new Date(contact.doBirth)}</Moment>}
                                    location={contact.clientStatus}
                                    avatar="http://i.pravatar.cc/100?id=skater"
                                    imageStyle={styles.cardImageRadius}
                                    imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                                />
                            </TouchableWithoutFeedback>
                        )
                    })}
                </Block>
            </ScrollView>
        );
    }
}

export default CardContact;