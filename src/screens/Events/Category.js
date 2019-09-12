import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Screen, Cardboard, Dialog, Input, Icon, styles, COLORS, SIZES, Files, actionsReducers} from '../../layout'

const dataTabs = [
    {title: 'Eventos', icon: 'list', target: 'Events'},
    {title: 'Calendario', icon: 'calendar', target: 'Calendar'},
    {title: 'Categorias', icon: 'book', target: 'Category'},
];

const actions = [
    {
        text: "Evento",
        icon: Files.event,
        name: "bt_event",
        position: 2
    },
    {
        text: "Catalogo",
        icon: Files.catalog,
        name: "bt_catalog",
        position: 1
    }
];


class Category extends Component {
    constructor(props){
        super(props);
        this.state={
            categories: this.props.categories,
            visible: '',
            value:''
        }
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getCategories();
                this.setState({ categories: this.props.categories });
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    search = text => {
        const {categories} = this.props;
        if (text === "" || text === null) {
            this.setState({ events: categories });
        } else {
            const matching = [];
            categories.map(category =>{
                if(text in category.category) matching.push(category)
            });
            this.setState({ categories: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_event') ? navigation.navigate('NewEvent') : this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: '',
            value:''
        });
    }

    onConfirm = () => {
        const {value} = this.state;
        this.props.saveCategory({
            category: value
        });
        this.setState({ visible: false, value: '' })
    }

    render() {
        const {navigation} = this.props;
        const {categories} = this.state;
        return (
            <Screen
            search
            onChangeSearch={this.search}
            placeholderSearch='Buscar categoria.'
            tabs
            tabsData={dataTabs}
            title="Categorias"
            navigation={navigation}
            floating={true}
            dataFloating={actions}
            onPressFloating={this.onPress}>
                {categories.map((category, i) => {
                    <Cardboard
                        key={i}
                        flex
                        borderless
                        shadowColor={COLORS.BLACK}
                        style={styles.card}
                        footer={true}
                        title={category.category}
                        caption={<Icon name="list" family="font-awesome" />}
                        imageStyle={styles.cardImageRadius}
                        imageBlockStyle={{ padding: SIZES.BASE / 2 }}
                    />
                })}
                <Dialog 
                    visible={visible}
                    title='Categoria'
                    subtitle='Ingresa nueva categoria.'
                    labelCancel='CANCELAR'
                    labelConfirm='OK'
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}>
                    <Input
                        rounded
                        type={'default'}
                        placeholder={'Nombre de la categoria'}
                        style={{width: width - SIZES.BASE * 4}}
                        onChangeText={(e) => this.setState({value: e})}
                        value={value}
                    />
                </Dialog>
            </Screen>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.event.categories,
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => {
        dispatch({ type: actionsReducers.GET_CATEGORIES });
    },
    saveCategory: (data) => {
        dispatch({
            type: actionsReducers.ADD_CATEGORY,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
