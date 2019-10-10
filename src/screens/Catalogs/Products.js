import React, { Component } from 'react'
import { TouchableOpacity} from "react-native";
import { connect } from 'react-redux'

import {Screen, Card, Dialog, Input, styles, width, COLORS, SIZES, actionsReducers} from '../../layout'

class Products extends Component {
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
        products: [],
        visible: false,
        catalog: '',
    }

    componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getProducts();
                this.setState({ products: this.props.products});
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({products: nextProps.products});
    }

    search = text => {
        if (text === "" || text === null) {
            this.setState({ products: this.props.products });
        } else {
            const {products} = this.props;
            const matching = [];
            products.map(product =>{
                if(product.name.indexOf(text) >= 0) matching.push(product)
            });
            this.setState({ products: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_product') ? navigation.navigate('NewProduct') : this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: '',
            catalog:''
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
        const {products, catalog, visible, data, actions} = this.state;
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar producto'
            tabs
            tabsData={data}
            title="Productos"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {products.map((product, i) => (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate('Detail', {product})}>
                        <Card
                            flex
                            borderless
                            shadowColor={COLORS.BLACK}
                            style={styles.card}
                            image={product.image ? {uri: product.image[0].image} : require('../../assets/images/nodisponible.jpg')}
                            footer={true}
                            title={product.name}
                            caption={`${catalog.points} Puntos`}
                            location={`$ ${catalog.price_cli}`}
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
    products: state.catalog.products,
});

const mapDispatchToProps = dispatch => ({
    getProducts: () => {
        dispatch({ type: actionsReducers.GET_PRODUCTS });
    },
    saveCatalog: (data) => {
        dispatch({
            type: actionsReducers.SAVE_CATALOG,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
