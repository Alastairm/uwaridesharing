 import React, { Component } from 'react';
 import { AppRegistry } from 'react-native';
 import App from './source/scenes/App';

 class ridesharing extends Component {
   render() {
     return (
       <App/>
     );
   }
 }

 AppRegistry.registerComponent('uwaridesharing', () => ridesharing);
