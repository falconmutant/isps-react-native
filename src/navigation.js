import React from 'react'
import {Easing, Animated, ScrollView} from 'react-native'
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerItems} from 'react-navigation'

import {Block, Text, Header, Drawer, Menu, styles, width} from './layout'
import * as screens from './screens'


const DrawerMenu = props => (
	<Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
		<Block flex={0.2} style={styles.headerDrawer}>
			<Menu {...props}/>
		</Block>
		<Block flex>
			<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				<DrawerItems {...props} />
			</ScrollView>
		</Block>
	</Block>
);

const MenuContent = {
	contentComponent: props => <DrawerMenu {...props} />,
	drawerBackgroundColor: 'white',
	drawerWidth: width * 0.8,
	contentOptions: {
		activeTintColor: 'white',
		inactiveTintColor: '#000',
		activeBackgroundColor: 'transparent',
		itemStyle: {
			width: width * 0.75,
			backgroundColor: 'transparent',
		},
		labelStyle: {
			fontSize: 18,
			marginLeft: 12,
			fontWeight: 'normal',
		},
		itemsContainerStyle: {
			paddingVertical: 16,
			paddingHorizonal: 12,
			justifyContent: 'center',
			alignContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
		},
	},
};

const transitionConfig = (transitionProps, prevTransitionProps) => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index
      const width = layout.initWidth
      
      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      })
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1],
      })
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })
  
      const scaleWithOpacity = { opacity }
      const screenName = "Search"
  
      if (screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
        return scaleWithOpacity;
      }
      return { transform: [{ translateX }] }
    }
})


const ContactsStack = createStackNavigator(
	{
		Contacts: {
			screen: screens.Contacts,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Profile: {
			screen: screens.Profile,
			navigationOptions: () => ({
				header: null,
			})
		},
		ImportContact: {
			screen: screens.ImportContact,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Phone: {
			screen: screens.Phone,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Email: {
			screen: screens.Email,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Address: {
			screen: screens.Address,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		NewAddress: {
			screen: screens.NewAddress,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Map: {
			screen: screens.Map,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
	},
	{
		cardStyle: { backgroundColor: '#EEEEEE', },
		transitionConfig,
	}
);

const EventsStack = createStackNavigator(
	{
		Events: {
			screen: screens.Events,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		NewEvent: {
			screen: screens.NewEvents,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Calendar: {
			screen: screens.Calendar,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		EventCategory: {
			screen: screens.EventCategory,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
	},
	{
		cardStyle: { backgroundColor: '#EEEEEE', },
		transitionConfig,
	}
);

const CatalogsStack = createStackNavigator(
	{
		Catalogs: {
			screen: screens.Catalogs,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
		Products: {
			screen: screens.Products,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
	},
	{
		cardStyle: { backgroundColor: '#EEEEEE', },
		transitionConfig,
	}
);

const UptakesStack = createStackNavigator(
	{
		Uptakes: {
			screen: screens.Uptakes,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
	},
	{
		cardStyle: { backgroundColor: '#EEEEEE', },
		transitionConfig,
	}
);

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: screens.Dashboard,
			navigationOptions: ({navigation}) => ({
				header: <Header title="Home" navigation={navigation} />,
			})
		},
		Contacts: {
			screen: screens.Contacts
		},
		Events: {
			screen: screens.Events
		},
		Catalogs: {
			screen: screens.Catalogs
		},
		Uptakes: {
			screen: screens.Uptakes
		},
		SignOut: {
			screen: screens.SignOut,
			navigationOptions: ({navigation}) => ({
				header: <Header back white transparent title="" navigation={navigation} />,
			})
		},
		Map: {
			screen: screens.Map,
			navigationOptions: () => ({
				headerTransparent: true,
			})
		},
	},
	{
		cardStyle: {
			backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
		},
		transitionConfig,
    }
);

const AppStack = createDrawerNavigator(
	{
		Dashboard: {
			screen: HomeStack,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Home" icon="home" />
				),
			}),
		},
		UserContacts: {
			screen: ContactsStack,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Contactos" icon="users" />
				),
			}),
		},
		UserEvents: {
			screen: EventsStack,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Eventos" icon="calendar" />
				),
			}),
		},
		UserCatalogs: {
			screen: CatalogsStack,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Catalogos" icon="book" />
				),
			}),
		},
		UserUptakes:{
			screen: UptakesStack,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Pedidos" icon="cart-arrow-down" />
				),
			}),
		},
		MenuDivider: {
			screen: HomeStack,
			navigationOptions: {
				drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
			},
		},
		Close: {
			screen: screens.SignOut,
			navigationOptions: (navOpt) => ({
				drawerLabel: ({focused}) => (
					<Drawer focused={focused} title="Salir" icon="sign-out" />
				),
			}),
		},
	},
	MenuContent
);

const AuthStack = createSwitchNavigator(
	{
		SignIn: screens.SignIn,
		SignUp: screens.SignUp,
		SignOut: screens.SignOut,
	},
);

const InitialNavigator = createSwitchNavigator(
	{
		Splash: screens.Splash,
		Auth: AuthStack,
		App: AppStack,
		Home2: HomeStack,
	},
	{
		initialRouteName: 'Splash',
	}
);

export default InitialNavigator