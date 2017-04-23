import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from 'native-base';
import Map from './Map.js';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    // ToDO: Check if user information is already saved
    this.state = {
      user: {
        name: false,
        email: false,
        phone: false,
      },
      valid: false,
      showErrors: false,
    };
    this.onNext = this.onNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNext() {
    // Navigator should use context instead of props.
    // eslint-disable-next-line
    this.props.navigator.push({
      component: Map,
    });
  }
  onChange(field, valid, val) {
    const user = this.state.user;
    user[field] = (valid ? val : false); // Only save value if valid, otherwise  false
    this.setState({ user });
  }
  async onSubmit() {
    const hasName = this.state.user.name;
    const hasEmail = this.state.user.email;
    const hasPhone = this.state.user.phone;
    if (hasName && hasEmail && hasPhone) { // If all fields are valid, save & goto next scene
      this.save();
      this.onNext();
    } else { // If not all fields are valid display error messages for invalid fields
      this.setState({ showErrors: true });
    }
  }
  async save() {
    await AsyncStorage.setItem('user.saved', 'true');
    await AsyncStorage.setItem('user.name', this.state.user.name);
    await AsyncStorage.setItem('user.email', this.state.user.email);
    await AsyncStorage.setItem('user.phone', this.state.user.phone);
  }

  focusNextField(nextField) {
    this[nextField].focus();
  }
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon active name= 'person' />
              <Label>Name</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Icon active name= 'mail' />
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Icon active name= 'home' />
              <Label>Phone</Label>
              <Input />
            </Item>
            <Button rounded large info onPress={this.onNext} >
              <Text> submit </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

}
