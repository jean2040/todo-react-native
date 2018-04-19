import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';

import store from './app/store'; //Import the store
import Main from './app/index' //Import the Main component file

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
