import React, { Component } from 'react';
import { Navigator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as firebase from 'firebase';

import Welcome from './Welcome.js';


EStyleSheet.build({
});

export default class App extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp({
      apiKey: 'AIzaSyDwBIng4cVUjQAkgu3_NgiO0gKP3zuFnXI',
      authDomain: 'uwaridesharing.firebaseapp.com',
      databaseURL: 'https://uwaridesharing.firebaseio.com',
      storageBucket: 'uwaridesharing.appspot.com',
    });
  }
  render() {
    return (
      <Navigator
        initialRoute={{ component: Welcome }}
        renderScene={(route, navigator) => (
          <route.component navigator={navigator} {...route.props} />
          )
        }
      />
    );
  }
}
