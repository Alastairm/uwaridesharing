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


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.login = this.login.bind(this);
  }
  async login() {
    const email = this.state.email;
    const pass = this.state.password;
    await firebase.auth().signInWithEmailAndPassword(email, pass);
      // Navigate to the Home page
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button rounded large info onPress={this.login}>
            <Text> login </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
