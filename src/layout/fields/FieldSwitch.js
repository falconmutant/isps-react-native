import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Block, Text, Switch, styles, COLORS } from '../index'

export default class FieldPublic extends Component {
    static propTypes = {
        saveField: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

    constructor(props){
        super(props);
        const {name, display, data} = props.data;
        this.state = {
            name,
            display,
            value: data,
        }
    }

    onChange = () => {
        const {name, value} = this.state;
        this.props.saveField({
            [name]: value
        });
    }

    render() {
        const {display, value} = this.state
        return (
            <Block row middle space="between" style={styles.rows}>
                <Text size={14}>{display}</Text>
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
