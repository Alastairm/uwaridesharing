import React, { Component } from 'react';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { Container, Button, Grid, Col } from 'native-base';
import { Styles, NativeStyles } from './Styles.js';

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Map from './Map.js';

const backgroundImage = { uri: 'https://fleeteng-static.s3.amazonaws.com/assets/background-081a9027c8c821541bf2d7816138fc87.jpg' };

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  async signUp() {
    try {
      console.log('debugger is working..');
      const uid = await AsyncStorage.getItem('user.uid');
      console.log(uid);
      const userSaved = await AsyncStorage.getItem('user.saved');
      if (uid !== null) {
        this.props.navigator.push({
          component: Map,
        });
      } else {
        this.props.navigator.push({
          component: SignUp,
        });
      }
    } catch (error) {
      // Navigator should use context instead of props.
      // eslint-disable-next-line
      this.props.navigator.push({
        component: SignUp,
      });
    }
  }
  signIn() {
    // Navigator should use context instead of props.
    // eslint-disable-next-line
    this.props.navigator.push({
      component: SignIn,
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
                <Button block bordered rounded style={NativeStyles.button} backgroundColor={'#fff'} onPress={this.signIn}>
                  <Text> Sign In </Text>
                </Button>
                <Button block bordered rounded style={NativeStyles.inButton} onPress={this.signUp}>
                  <Text> Sign Up </Text>
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
