import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Block, Text, Switch, styles, COLORS } from '../index'

export default class FieldPublic extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        this.state = {
            value: false
        }
    }

    onChange = () => {
        const {value} = this.state;
        this.saveField({
            isPublic: value
        });
    }

    render() {
        const {value} = this.state
        return (
            <Block row middle space="between" style={styles.rows}>
                <Text size={14}>Todo el día</Text>
                <Switch
                    ios_backgroundColor={COLORS.GREY}
                    thumbColor={Platform.OS === 'android' ? COLORS.GREY : null}
                    trackColor={{ false: COLORS.GREY, true: COLORS.BLUE }}
                    onValueChange={this.onChange}
                    onChange={() => this.setState({ value: !value })}
                    value={value}
                />
            </Block>
        )
    }
}
