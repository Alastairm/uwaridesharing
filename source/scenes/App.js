import React, { Component } from 'react';
import { Image, Navigator, StyleSheet, View } from 'react-native';

import Welcome from './Welcome.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


export default class App extends Component {
  render() {
    return (
    <Navigator
      initialRoute={{component: Welcome}}
      renderScene={(route, navigator) => {
          return React.createElement(route.component, { navigator });
      }}
    />
  );
  }
}
