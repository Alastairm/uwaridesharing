/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './source/components/App';

class ridesharing extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('ridesharing', () => ridesharing);
