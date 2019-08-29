import React, { Component } from 'react'
import { Block, Text, Icon, Radio } from '../../../../../themes/galio'
import styles, {COLORS} from '../../styles'

export default class RadioCategory extends Component {
    constructor(props){
        super(props);
        const {category} = this.props.contact;
        this.state = {
            display: 'Categoria',
            distributor: category=='DISTRIBUTOR' ? true: false,
            client: category=='CLIENT' ? true : false,
            value: category,
        }
    }

    Change = category => {
        this.setState({
            distributor: category=='DISTRIBUTOR' ? true: false,
            client: category=='CLIENT' ? true : false,
            value: category,
        });
        this.props.changeProfile({
            id: this.props.contact.id,
            category,
        })
    };

    render() {
        const {display, distributor, client} = this.state;
        return (
            <Block style={styles.rows}>
                <Block row middle space="between" style={{paddingTop:7}}>
                    <Text size={14}>{display}</Text>
                    <Icon name="user" family="font-awesome" style={{ paddingRight: 5 }} />
                </Block>
                <Block row middle space="between" style={{paddingTop:7}}>
                    <Radio 
                        label="Distribuidor"
                        color={COLORS.BLUE}
                        initialValue={distributor}
                        onChange={() => this.Change('DISTRIBUTOR')}
                    />
                    <Radio 
                        label="Cliente"
                        color={COLORS.BLUE}
                        initialValue={client}
                        onChange={() => this.Change('CLIENT')}
                    />
                </Block>
            </Block>
        )
    }
}
