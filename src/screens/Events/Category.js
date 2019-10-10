import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Screen, Card, Dialog, Input, Icon, styles, width, COLORS, SIZES, actionsReducers} from '../../layout'

const dataTabs = [
    {title: 'Eventos', icon: 'list', target: 'Events'},
    {title: 'Calendario', icon: 'calendar', target: 'Calendar'},
    {title: 'Categorias', icon: 'book', target: 'EventCategory'},
];

const actions = [
    {
        text: "Evento",
        icon: require('../../assets/images/event.png'),
        name: "bt_event",
        position: 2
    },
    {
        text: "Categoria",
        icon: require('../../assets/images/catalog.png'),
        name: "bt_catalog",
        position: 1
    }
];


class Category extends Component {
    state={
        data: [],
        visible: false,
        value:''
    }

    componentWillMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.props.getCategories();
                this.setState({ data: this.props.categories });
            }),
        ];
    }

    componentWillUnmount () {
        this.subs.forEach(sub => sub.remove());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.categories});
    }

    search = text => {
        const {categories} = this.props;
        if (text === "" || text === null) {
            this.setState({ data: categories });
        } else {
            const matching = [];
            categories.map(category =>{
                if(category.category.indexOf(text) >= 0) matching.push(category)
            });
            this.setState({ data: matching });
        }
    }

    onPress = name => {
        const {navigation} = this.props;
        (name === 'bt_event') ? navigation.navigate('NewEvent') : this.setState({ visible: true });
    }

    onCancel = () => {
        this.setState({
            visible: false,
            value:''
        });
    }

    onConfirm = () => {
        const {value, data} = this.state;
        this.props.saveCategory({
            category: value
        });
        data.push({ category: value })
        this.setState({ visible: false, value: '', data })
    }

    render() {
        const {navigation} = this.props;
        const {data, visible, value} = this.state;
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
                {data.map((category, i) => (
                    <Card
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
                ))}
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
            type: actionsReducers.SAVE_CATEGORY,
            payload: data,
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
