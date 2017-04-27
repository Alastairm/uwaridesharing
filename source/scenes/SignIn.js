import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import * as firebase from 'firebase';

import Map from './Map.js';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.login = this.login.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPass = this.setPass.bind(this);
  }
  setEmail(email) {
    this.setState({ email });
  }
  setPass(password) {
    this.setState({ password });
  }
  async login() {
    const email = this.state.email;
    const pass = this.state.password;
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    // eslint-disable-next-line
    this.props.navigator.push({
      component: Map,
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={this.setEmail} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={this.setPass} />
            </Item>
          </Form>
          <Button rounded large info onPress={this.login}>
            <Text> Login </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
