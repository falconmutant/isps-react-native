import React, { Component } from 'react'
import { TouchableOpacity} from "react-native";
import { connect } from 'react-redux'

import {Screen, Card, Dialog, Input, styles, width, COLORS, SIZES, actionsReducers} from '../../layout'

class Catalogs extends Component {
    state = {
        actions: [
            {
                text: "Catalogo",
                icon: require('../../assets/images/catalog.png'),
                name: "bt_catalog",
                position: 2
            },
            {
                text: "Producto",
                icon: require('../../assets/images/event.png'),
                name: "bt_product",
                position: 1
            }
        ],
        data: [
            {title: 'Catalogos', icon: 'book', target: 'Catalogs'},
            {title: 'Productos', icon: 'shopping-basket', target: 'Products'},
        ],
        catalogs: [],
        visible: false,
        catalog: '',
    }

    componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getCatalogs();
                this.setState({ catalogs: this.props.catalogs});
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({catalogs: nextProps.catalogs});
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ catalogs: this.props.catalogs });
        } else {
            const {catalogs} = this.props;
            const matching = [];
            catalogs.map(catalog =>{
                if(catalog.catalog_name.indexOf(text) >= 0) matching.push(catalog)
            });
            this.setState({ catalogs: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_product') ? navigation.navigate('NewProduct') : this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: false,
            catalog: '',
        });
    }

    onConfirm = () => {
        const {catalog} = this.state;
        this.props.saveCatalog({
            catalog_name: catalog
        });
        this.setState({ visible: false, catalog: '' })
    }

    render() {
        const {navigation} = this.props;
        const {catalogs, catalog, visible, data, actions} = this.state
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar catalogo'
            tabs
            tabsData={data}
            title="Catalogos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {catalogs.map((catalog, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Detail', {catalog})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            image={catalog.image ? {uri: catalog.image.image} : require('../../assets/images/nodisponible.jpg')}
                            footer={true}
                            title={catalog.catalog_name}
                            caption={''}
                            location={`${catalog.products.length} Productos`}
                            imageStyle={styles.cardImageRadius}
                            imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                        />
                    </TouchableOpacity>
                ))}
                <Dialog 
                    visible={visible}
                    title='Catalogo'
                    subtitle='Crear nuevo catalogo.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'Nombre del catalogo'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({catalog: e})}
                        value={catalog}
                    />
                </Dialog>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    catalogs: state.catalog.catalogs,
});

const mapDispatchToProps = dispatch => ({
    getCatalogs: () => {
        dispatch({ type: actionsReducers.GET_CATALOGS });
    },
    saveCatalog: (data) => {
        dispatch({
            type: actionsReducers.SAVE_CATALOG,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalogs);
