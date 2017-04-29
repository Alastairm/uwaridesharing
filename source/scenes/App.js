import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';
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
    AsyncStorage.removeItem('user.uid');
    // console.log("If you can read this your debugger is working");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        AsyncStorage.setItem('user.uid', user.uid);
        // console.log(user.uid);
        // console.log(JSON.stringify(user));
      }
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
