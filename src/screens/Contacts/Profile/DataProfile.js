import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { FullName, DoBirth, MaritalStatus, Category } from './components/DataProfile'
import { Block, Text, Icon } from '../../../themes/galio'
import styles, { SIZES } from './styles'


export default class DataProfile extends Component {
    render() {
        const {contact} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <Block center style={{ marginTop: -SIZES.BASE * 2 }}>
                <Block flex style={styles.header}>
                    <Block style={styles.title}>
                        <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                            Datos del contacto
                        </Text>
                        <Text center muted size={12}>
                            Nombre, Cumpleaños, Otros.
                        </Text>
                    </Block>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <FullName {...this.props} />
                        <DoBirth {...this.props} />
                        <MaritalStatus {...this.props} />
                    </Block>
                    <Block style={styles.title}>
                        <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                            Telefono
                        </Text>
                        <Text center muted size={12}>
                            Telefonos del contacto
                        </Text>
                    </Block>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <TouchableOpacity onPress={() => navigate('Phone', {contact})}>
                            <Block row middle space="between" style={{paddingTop:7}}>
                                <Text size={14}>Telefonos</Text>
                                <Icon name="phone" family="font-awesome" style={{ paddingRight: 5 }} />
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block style={styles.title}>
                        <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                            Correo electronico
                        </Text>
                        <Text center muted size={12}>
                            correos del contacto
                        </Text>
                    </Block>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <TouchableOpacity onPress={() => navigate('Email', {contact})}>
                            <Block row middle space="between" style={{paddingTop:7}}>
                                <Text size={14}>Correos</Text>
                                <Icon name="envelope" family="font-awesome" style={{ paddingRight: 5 }} />
                            </Block>
                        </TouchableOpacity>
                    </Block>
                    <Block style={styles.title}>
                        <Text bold center size={SIZES.BASE} style={{ paddingBottom: 5 }}>
                            Dirección
                        </Text>
                        <Text center muted size={12}>
                            Direcciones conocidas del contacto
                        </Text>
                    </Block>
                    <Block style={{marginVertical: SIZES.CARD_MARGIN_VERTICAL}}>
                        <TouchableOpacity onPress={() => navigate('Address', {contact})}>
                            <Block row middle space="between" style={{paddingTop:7}}>
                                <Text size={14}>Direcciones</Text>
                                <Icon name="location-arrow" family="font-awesome" style={{ paddingRight: 5 }} />
                            </Block>
                        </TouchableOpacity>
                    </Block>
                </Block>
            </Block>
        )
    }
}