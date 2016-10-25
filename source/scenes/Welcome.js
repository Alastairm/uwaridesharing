import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Styles from './Styles.js';

import UserForm from './UserForm.js';
import Map from './Map.js';
import Button from '../components/Button.js';

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
        <Button
          onPress={this.onClear}>
          Clear App Data
        </Button>
        <View style={{alignSelf: 'center'}}>
        <Text>
          UWA RideSharing
        </Text>
      </View>
      <Button
        onPress={this.onNext}>
        Hello
      </Button>
      <Button
        onPress={this.onNext}>
        Get Started
      </Button>
      </View>
    );
  }
}
