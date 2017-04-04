import React from 'react';
import { AppRegistry } from 'react-native';
import App from './source/scenes/App';

function ridesharing() {
  return (
    <App />
  );
}

AppRegistry.registerComponent('uwaridesharing', () => ridesharing);
