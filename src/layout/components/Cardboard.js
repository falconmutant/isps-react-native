import React, { Component } from 'react'
import { Image } from 'react-native'
import MapView from 'react-native-maps'


import { Block, withGalio, styles, width, height } from '../index';


class Cardboard extends Component {
    renderImage() {
        const { image, imageBlockStyle, imageStyle } = this.props;
        if (!image) return null;
        return (
          <Block card style={[styles.imageBlock, imageBlockStyle]}>
            <Image source={image} style={[styles.image, imageStyle]} />
          </Block>
        );
    }

    renderMap() {
        const { map, dataMap, imageBlockStyle, styles } = this.props;
        if(!map) return null;
        return(
            <Block card style={[styles.imageBlock, imageBlockStyle]}>
              <MapView
                  liteMode
                  key={'map-0'}
                  style={styles.map}
                  initialRegion={{
                    latitude: dataMap.latitude,
                    longitude: dataMap.longitude,
                    latitudeDelta: 0.0055,
                    longitudeDelta: 0.0055 * (width / height),
                  }}
              />
            </Block>
        )
    }

    renderAvatar() {
        const { avatar } = this.props;
        if (!avatar) return null;
        return (
            <Block flex={0.3}>
                <Image source={avatar} style={styles.avatarCardboard} />
            </Block>
        );
    }

    renderLocation() {
        const { location, locationColor } = this.props;
        if (!location) return null;
    
        if (typeof location !== 'string') {
          return location;
        }
    
        return (
          <Block row right>
            <Text
              muted
              size={SIZES.FONT * 0.875}
              color={locationColor || COLORS.MUTED}
              style={{ marginLeft: SIZES.BASE * 0.25 }}>
              {location}
            </Text>
          </Block>
        );
      }

    renderFooter() {
        const { footer, avatar, title, titleColor, caption, captionColor, footerStyle, children } = this.props;
        if(!footer) return (
            <Block flex row style={[styles.footer, footerStyle]} space="between">
                {this.renderAvatar()}
                {children}
            </Block>
        );
        return (
          <Block flex row style={[styles.footer, footerStyle]} space="between">
            {this.renderAvatar()}
            <Block flex={avatar ? 1.7 : 2}>
              <Block style={{justifyContent: 'center'}}>
                <Text size={SIZES.FONT * 0.875} color={titleColor}>
                  {title}
                </Text>
              </Block>
              <Block row space="between">
                <Block row right>
                  <Text p muted size={SIZES.FONT * 0.875} color={captionColor}>
                    {caption}
                  </Text>
                </Block>
                {this.renderLocation()}
              </Block>
            </Block>
          </Block>
        );
    }

    render() {
        const { card, shadow, borderless, style, children, ...props } = this.props;
        const styleCard = [borderless && { borderWidth: 0 }, style];
        return (
            <Block {...props} card={card} shadow={shadow} style={styleCard}>
                {this.renderImage()}
                {this.renderMap()}
                {this.renderFooter()}
            </Block>
        )
    }
}

export default Cardboard;
