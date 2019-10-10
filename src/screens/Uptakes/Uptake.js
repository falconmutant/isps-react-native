import React, { Component } from 'react'
import { TouchableOpacity, Text} from "react-native";
import { connect } from 'react-redux'


import {Screen, Card, Dialog, Input, styles, width, COLORS, SIZES, actionsReducers} from '../../layout'

class Uptake extends Component {
    constructor(props){
        super(props);
        this.state = {
            actions: [
                {
                    text: "Nuevo Pedido",
                    icon: require('../../assets/images/catalog.png'),
                    name: "bt_uptake",
                    position: 1
                }
            ],
            data: [],
        }
    }

    componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getUptakes();
                this.setState({ data: this.props.uptakes});
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.uptakes});
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ data: this.props.uptakes });
        } else {
            const {uptakes} = this.props;
            const matching = [];
            uptakes.map(uptake =>{
                if(uptake.startDate.indexOf(text) >= 0) matching.push(uptake)
            });
            this.setState({ data: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_uptake') ? navigation.navigate('NO') : navigation.navigate('NO');
    }

    render() {
        const {navigation} = this.props;
        const {actions, data} = this.state;
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar uptake.'
            title="Pedidos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {data.map((uptake, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Detail', {uptake})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            footer={true}
                            title={uptake.profile.fullName}
                            location={`${uptake.product.length} Productos`}
                            avatar={uptake.profile.image ? {uri: uptake.profile.image.image} : require('../../assets/images/avatar.png')}
                            imageStyle={styles.cardImageRadius}
                            imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                        />
                    </TouchableOpacity>
                ))}
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    uptakes: state.uptake.uptakes,
});


const mapDispatchToProps = dispatch => ({
    getUptakes: () => {
        dispatch({ type: actionsReducers.GET_UPTAKES });
    },
    saveUptake: (data) => {
        dispatch({
            type: actionsReducers.SAVE_UPTAKE,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Uptake);