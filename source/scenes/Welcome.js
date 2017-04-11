import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
// import { Content } from 'native-base';

import Styles from './Styles.js';

import UserForm from './UserForm.js';
import Map from './Map.js';
import SpatulaTest from './SpatulaTest.js';

import Button from '../components/Button.js';

const backgroundImage = { uri: 'https://fleeteng-static.s3.amazonaws.com/assets/background-081a9027c8c821541bf2d7816138fc87.jpg' };

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.onNext = this.onNext.bind(this);
    this.onApiTest = this.onApiTest.bind(this);
  }
  async onNext() {
    try {
      const userSaved = await AsyncStorage.getItem('user.saved');
      if (userSaved === 'true') {
        this.props.navigator.push({
          component: Map,
        });
      } else {
        this.props.navigator.push({
          component: UserForm,
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      this.props.navigator.push({
        component: UserForm,
      });
    }
  }
  onApiTest() {
    // eslint-disable-next-line
    this.props.navigator.push({
      component: SpatulaTest,
    });
  }
  render() {
    return (
      <View style={Styles.scene}>
        <Image
          source={backgroundImage}
          style={Styles.backgroundImage}
          resizeMode={Image.resizeMode.sretch}
        >
          <View style={Styles.scene}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={Styles.welcomeTitle}>
                UniRide
              </Text>
              <Text style={Styles.welcomeSubtitle}>
                UWA Rideshare
              </Text>
            </View>
            <Button onPress={this.onNext} >
              <Text>Sign In</Text>
            </Button>
            <Button
              backgroundColor="#303030"
              onPress={this.onApiTest}
            >
              <Text>API Test</Text>
            </Button>
            <Button
              backgroundColor="#303030"
              onPress={AsyncStorage.clear}
            >
              <Text>Clear App Data</Text>
            </Button>
          </View>
        </Image>
      </View>
    );
  }
}
