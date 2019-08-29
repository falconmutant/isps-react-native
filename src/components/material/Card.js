import React, { Component } from 'react'
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Block, Text, theme } from '../../themes/galio'
import {materialTheme} from "../../themes/material";

const { width } = Dimensions.get('screen');
const { COLORS, SIZES } = theme;

class Card extends Component {
    cardImage = ({navigation, target, data, full, imageStyle}) => {
        const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(target, { data })}>
                <Block flex style={[styles.imageContainer, styles.shadow]}>
                    <Image source={{ uri: data.image }} style={imageStyles} />
                </Block>
            </TouchableWithoutFeedback>
        )
    };
    render() {
        const { navigation, target, data, horizontal, style, spanColor, imageCard } = this.props;

        return (
            <Block row={horizontal} card flex style={[styles.card, styles.shadow, style]}>
                {imageCard ? this.cardImage(this.props): null}
                <TouchableWithoutFeedback onPress={() => navigation.navigate(target, { data })}>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Text size={16} style={styles.cardTitle}>{data.title}</Text>
                        <Text size={14} style={styles.cardTitle}>{data.subtitle}</Text>
                        <Text size={12} muted={!spanColor} color={spanColor}>{data.span}</Text>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

export default withNavigation(Card);

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.WHITE,
        marginVertical: SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
    },
    cardTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 1,
    },
    cardDescription: {
        padding: SIZES.BASE / 2,
    },
    imageContainer: {
        elevation: 1,
    },
    image: {
        borderRadius: 3,
        marginHorizontal: SIZES.BASE / 2,
        marginTop: -16,
    },
    horizontalImage: {
        height: 122,
        width: 'auto',
    },
    fullImage: {
        height: 215,
        width: width - SIZES.BASE * 3,
    },
    shadow: {
        shadowColor: materialTheme.COLORS.ACTIVE,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});