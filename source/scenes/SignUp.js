import React, { Component, PropTypes } from 'react';
import { AsyncStorage, Text } from 'react-native';
import {
  Col,
  Container,
  Content,
  Form,
  Grid,
  Item,
  Input,
  Label,
  Button,
  Icon,
} from 'native-base';
import * as firebase from 'firebase';

import { Styles, NativeStyles } from './Styles.js';
import Map from './Map.js';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    // ToDO: Check if user information is already saved
    this.state = {
      user: {
        name: false,
        email: false,
        phone: false,
        pass: false,
      },
      valid: false,
      showErrors: false,
      isFilled: {
        name: false,
        email: false,
        phone: false,
        pass: false,
      },
      isValid: {
        name: false,
        email: false,
        phone: false,
        pass: false,
      },
    };
    this.onNext = this.onNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setUserField = this.setUserField.bind(this);
    this.setIsValid = this.setIsValid.bind(this);
    this.setIsfilled = this.setIsfilled.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.validatePass = this.validatePass.bind(this);
    this.nameFilled = this.nameFilled.bind(this);
    this.emailFilled = this.emailFilled.bind(this);
    this.phoneFilled = this.phoneFilled.bind(this);
    this.passFilled = this.passFilled.bind(this);
    this.save = this.save.bind(this);
  }
  async onNext() {
    // Navigator should use context instead of props.
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.user.email, this.state.user.pass)
      .then((user) => {
        firebase.database().ref(`users/${user.uid}`).set({
          name: this.state.user.name,
          email: this.state.user.email,
          phone: this.state.user.phone,
        });
        AsyncStorage.setItem('user.uid', user.uid);
      });

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
    if (!(this.state.isValid.name && this.state.isValid.email &&
          this.state.isValid.phone && this.state.isValid.pass)) {
      return;
    }
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
  setUserField(fieldName, fieldValue) {
    const user = this.state.user;
    user[fieldName] = fieldValue;
    this.setState(user);
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
  validateName(text) {
    // I give up on regex for this sree
    const valid = text.length > 0;
    this.setIsValid('name', valid);
    this.setUserField('name', text);
  }
  validateEmail(text) {
    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@(student\.|)(uwa\.edu\.au)$/;
    const valid = emailRegex.test(text);
    this.setIsValid('email', valid);
    this.setUserField('email', text);
  }
  validatePhone(text) {
    const phoneRegex = /04[0-9]{8}$/;
    const valid = phoneRegex.test(text);
    this.setIsValid('phone', valid);
    this.setUserField('phone', text);
  }
  validatePass(text) {
    const valid = text.length > 5;
    this.setIsValid('pass', valid);
    this.setUserField('pass', text);
  }
  nameFilled() {
    this.setIsfilled('name', true);
  }
  emailFilled() {
    this.setIsfilled('email', true);
  }
  phoneFilled() {
    this.setIsfilled('phone', true);
  }
  passFilled() {
    this.setIsfilled('pass', true);
  }
  async save() {
    await AsyncStorage.setItem('user.saved', 'true');
    await AsyncStorage.setItem('user.name', this.state.user.name);
    await AsyncStorage.setItem('user.email', this.state.user.email);
    await AsyncStorage.setItem('user.phone', this.state.user.phone);
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
                onChangeText={this.validateName}
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
              <Label>Mobile</Label>
              <Input
                onChangeText={this.validatePhone}
                onBlur={this.phoneFilled}
              />
            </Item>
            <Item
              floatingLabel
              success={this.state.isFilled.pass && this.state.isValid.pass}
              error={this.state.isFilled.pass && !this.state.isValid.pass}
            >
              <Icon active name="key" />
              <Label>Password</Label>
              <Input
                onChangeText={this.validatePass}
                onBlur={this.passFilled}
              />
            </Item>
          </Form>
          <Grid>
            <Col size={25} />
            <Col size={50}>
              <Button rounded block style={NativeStyles.button} backgroundColor={'#0060b6'} marginTop={'30%'} onPress={this.onNext} >
                <Text> SUBMIT </Text>
              </Button>
            </Col>
            <Col size={25} />
          </Grid>
          <NameErrorMessage
            isFilled={this.state.isFilled.name}
            isValid={this.state.isValid.name}
          />
          <EmailErrorMessage
            isFilled={this.state.isFilled.email}
            isValid={this.state.isValid.email}
          />
          <PhoneErrorMessage
            isFilled={this.state.isFilled.phone}
            isValid={this.state.isValid.phone}
          />
        </Content>
      </Container>
    );
  }
}

function NameErrorMessage({ isFilled, isValid }) {
  const show = isFilled && !isValid;
  if (show) {
    return (
      <Text style={Styles.errorText} >
        Please enter a name.
      </Text>
    );
  }
  return null;
}
NameErrorMessage.propTypes = {
  isFilled: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

function EmailErrorMessage({ isFilled, isValid }) {
  const show = isFilled && !isValid;
  if (show) {
    return (
      <Text style={Styles.errorText} >
        Please enter a valid .uwa.edu.au email address.
      </Text>
    );
  }
  return null;
}
EmailErrorMessage.propTypes = {
  isFilled: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

function PhoneErrorMessage({ isFilled, isValid }) {
  const show = isFilled && !isValid;
  if (show) {
    return (
      <Text style={Styles.errorText} >
        Please enter a valid Australian mobile number.
      </Text>
    );
  }
  return null;
}
PhoneErrorMessage.propTypes = {
  isFilled: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};
