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

// import { Styles } from './Styles.js';
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
      isFilled: {
        name: false,
        email: false,
        phone: false,
      },
      isValid: {
        name: false,
        email: false,
        phone: false,
      },
    };
    this.onNext = this.onNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setIsValid = this.setIsValid.bind(this);
    this.setIsfilled = this.setIsfilled.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.nameFilled = this.nameFilled.bind(this);
    this.emailFilled = this.emailFilled.bind(this);
    this.phoneFilled = this.phoneFilled.bind(this);
    this.save = this.save.bind(this);
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
  setIsfilled(fieldName, filledStatus) {
    const isFilled = this.state.isFilled;
    isFilled[fieldName] = filledStatus;
    this.setState(isFilled);
  }
  setIsValid(fieldName, validStatus) {
    const isValid = this.state.isValid;
    isValid[fieldName] = validStatus;
    this.setState(isValid);
  }
  validateEmail(text) {
    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@(student\.|)(uwa\.edu\.au)$/;
    const valid = emailRegex.test(text);
    this.setIsValid('email', valid);
  }
  validateName(text) {
    const nameRegex = /[\u0000-\uFFFF]/;// Matches all unicode strings
    const valid = nameRegex.test(text);
    this.setIsValid('name', valid);
  }
  validatePhone(text) {
    const phoneRegex = /04[0-9]{8}$/;
    const valid = phoneRegex.test(text);
    this.setIsValid('phone', valid);
  }
  nameFilled() {
    const valid = true;
    this.setIsfilled('name', valid);
  }
  emailFilled() {
    const valid = true;
    this.setIsfilled('email', valid);
  }
  phoneFilled() {
    const valid = true;
    this.setIsfilled('phone', valid);
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
            <Item
              floatingLabel
              success={this.state.isFilled.name && this.state.isValid.name}
              error={this.state.isFilled.name && !this.state.isValid.name}
            >
              <Icon active name="person" />
              <Label>Name</Label>
              <Input
                onChangeTextValue={this.validateName}
                onBlur={this.nameFilled}
              />
            </Item>
            <Item
              floatingLabel
              success={this.state.isFilled.email && this.state.isValid.email}
              error={this.state.isFilled.email && !this.state.isValid.email}
            >
              <Icon active name="mail" />
              <Label>Email</Label>
              <Input
                onChangeText={this.validateEmail}
                onBlur={this.emailFilled}
              />
            </Item>
            <Item
              floatingLabel
              success={this.state.isFilled.phone && this.state.isValid.phone}
              error={this.state.isFilled.phone && !this.state.isValid.phone}
            >
              <Icon active name="phone-portrait" />
              <Label>Phone</Label>
              <Input
                onChangeText={this.validatePhone}
                onBlur={this.phoneFilled}
              />
            </Item>
            <Button rounded large info onPress={this.onNext} >
              <Text> submit </Text>
            </Button>
          </Form>
          <Text> {JSON.stringify(this.state)} </Text>
        </Content>
      </Container>
    );
  }

}
