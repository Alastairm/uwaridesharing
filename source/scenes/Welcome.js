import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { Container, Button, Grid, Col } from 'native-base';
import { Styles, NativeStyles } from './Styles.js';

import UserForm from './UserForm.js';
import Map from './Map.js';
import SpatulaTest from './SpatulaTest.js';

// import Button from '../components/Button.js';

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
      // Navigator should use context instead of props.
      // eslint-disable-next-line
      this.props.navigator.push({
        component: UserForm,
      });
    }
  }
  onApiTest() {
    // Navigator should use context instead of props.
    // eslint-disable-next-line
    this.props.navigator.push({
      component: SpatulaTest,
    });
  }
  render() {
    return (
      <Container>
        <Image
          source={backgroundImage}
          style={Styles.backgroundImage}
          resizeMode={Image.resizeMode.stretch}
        >
          <View style={Styles.scene}>
            <Text style={Styles.welcomeTitle}> UniRide </Text>
            <Text style={Styles.welcomeSubtitle}> UWA Rideshare </Text>
            <Grid>
              <Col size={25} />
              <Col size={50}>
                <Button block bordered rounded style={NativeStyles.inButton} onPress={this.onNext}>
                  <Text> Sign In </Text>
                </Button>
                <Button block bordered rounded style={NativeStyles.button} backgroundColor={'#fff'} onPress={this.onApiTest}>
                  <Text> API Test </Text>
                </Button>
                <Button block bordered rounded style={NativeStyles.button} backgroundColor={'#fff'} onPress={AsyncStorage.clear}>
                  <Text> Clear App Data </Text>
                </Button>
              </Col>
              <Col size={25} />
            </Grid>
          </View>
        </Image>
      </Container>
    );
  }
}
