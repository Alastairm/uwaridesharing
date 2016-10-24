import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import Styles from './Styles.js';

import UserForm from './UserForm.js';
import Map from './Map.js';


export default class Welcome extends Component{
  constructor(props) {
    super(props);
    this.onNext = this.onNext.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  async onNext() {
    try{
      let userSaved = await AsyncStorage.getItem('user.saved');
      if (userSaved == 'true') {
        this.props.navigator.push({
          component: Map
        });
      } else {
        this.props.navigator.push({
          component: UserForm
        });
      }
    } catch(error) {
      this.props.navigator.push({
        component: UserForm
      });
    }
  }
  async onClear() {
    await AsyncStorage.clear();
  }
  render() {
    return(
      <View style={Styles.scene}>
        <View style={Styles.buttonContainer}>
          <Button
            containerStyle={Styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onClear}>
            Clear App Data
          </Button>
        </View>
        <View style={{alignSelf: 'center'}}>
        <Text>
          UWA RideSharing
        </Text>
      </View>
        <View style={Styles.buttonContainer}>
          <Button
            containerStyle={Styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onNext}>
            Get Started
          </Button>
        </View>
      </View>
    );
  }
}
