/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { getStore, getPersistor, AppWithNavigationState } from './src/store'
import { Block, GalioProvider } from './src/themes/galio'
import { materialTheme } from './src/themes/material'

export default class App extends Component {
  render() {
    const myStore = getStore();
    const myPersistor = getPersistor();
    return (
        <Provider store={ myStore}>
          <PersistGate persistor={myPersistor}>
            <GalioProvider theme={materialTheme}>
              <Block style={{flex: 1}}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppWithNavigationState />
              </Block>
            </GalioProvider>
          </PersistGate>
        </Provider>
    );
  }
}
