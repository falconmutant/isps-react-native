import React, { Component } from 'react';
import { Radio } from "../../../themes/galio";
import { ScrollView } from "react-native";
import PropTypes from 'prop-types'
import styles, { COLORS, SIZES } from './styles'

import Avatar from './Avatar'
import ListItem from './ListItem'



class CardContact extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
    };

    

    render() {
        const {contacts, saveImport} = this.props;

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cardContacts}>
                {contacts.map(function (contact) {
                    return(
                        <ListItem
                            leftElement={
                                <Avatar
                                    img={
                                    contact.hasThumbnail
                                        ? { uri: contact.thumbnailPath }
                                        : require("../../../assets/images/avatar.png")
                                    }
                                    width={40}
                                    height={40}
                                />
                            }
                            key={contact.recordID}
                            title={`${contact.givenName} ${contact.familyName ? contact.familyName : ''}`}
                            description={`${contact.company}`}
                            rightElement={<Radio
                                label=''
                                color={COLORS.PRIMARY}
                                initialValue={false}
                                onChange={() => saveImport(contact)}
                            />}
                        />
                    )
                })}
            </ScrollView>
        );
    }
}

const getAvatarInitials = textString => {
    if (!textString) return "";
    const text = textString.trim();
    const textSplit = text.split(" ");
    if (textSplit.length <= 1) return text.charAt(0);
    const initials = textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
};

export default CardContact;