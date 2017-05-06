import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { Container, Button, Grid, Col } from 'native-base';

import { Styles, NativeStyles } from './Styles.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';

const backgroundImage = { uri: 'https://fleeteng-static.s3.amazonaws.com/assets/background-081a9027c8c821541bf2d7816138fc87.jpg' };

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  async signUp() {
    // eslint-disable-next-line
    this.props.navigator.push({
      component: SignUp,
    });
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
              <Col size={20} />
              <Col size={60}>
                <Button block bordered large rounded style={NativeStyles.button} backgroundColor={'#faba12'} marginTop={'50%'} onPress={this.signIn}>
                  <Text style={Styles.buttonText}> Sign In </Text>
                </Button>
                <Button block bordered large rounded style={NativeStyles.inButton} backgroundColor={'white'} onPress={this.signUp}>
                  <Text style={Styles.buttonText}> Sign Up </Text>
                </Button>
              </Col>
              <Col size={20} />
            </Grid>
          </View>
        </Image>
      </Container>
    );
  }
}
