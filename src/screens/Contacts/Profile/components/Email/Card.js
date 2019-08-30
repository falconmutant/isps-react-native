import React, {Component} from 'react';
import {Card, Icon, theme} from "../../../../../themes/galio";
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity} from "react-native";

const { width } = Dimensions.get('screen');


export default class CardEmail extends Component {
    constructor(props){
        super(props);
        this.state={
            emails: this.props.contact.profile_email,
        }
    }

    Delete = pos =>{
        const {emails} = this.state;
        this.setState({
            emails: emails.splice(pos, emails.length),
        });
        this.props.changeProfile({
            id: this.props.contact.id,
            emails: emails.splice(pos, emails.length),
        });
    };

    render() {
        const {emails} = this.state;
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.email}>
                    {emails.map(function (email, i) {
                        return(
                            <Card
                                key={i}
                                flex
                                borderless
                                shadowColor={theme.COLORS.BLACK}
                                style={styles.card}
                                title={email.emailAddress}
                                location={
                                    <TouchableOpacity onPress={(i)=> this.Delete}>
                                        <Icon name="trash" family="font-awesome" style={{ paddingRight: 5 }} />
                                    </TouchableOpacity>
                                }
                                caption={<Icon name="envelope" family="font-awesome" style={{ paddingRight: 5 }} />}
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
    email: {
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
