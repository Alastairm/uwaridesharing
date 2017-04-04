import React, { Component, Proptypes } from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import Button from 'native-base';

import UserInput from '../components/UserInput.js';
import Map from './Map.js';

export default class UserForm extends Component {
  static get propTypes() {
    return {
      navigator: Proptypes.shape({
        push: Proptypes.object,
      }).isRequired,
    };
  }
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
      <View>
        <UserInput
          field="name"
          onChange={this.onChange}
          onNextField={this.focusNextField}
          finalField={false}
          showError={this.state.showErrors}
        />
        <UserInput
          field="email"
          onChange={this.onChange}
          finalField={false}
          showError={this.state.showErrors}
        />
        <UserInput
          field="phone"
          onChange={this.onChange}
          showError={this.state.showErrors}
        />
        <Button
          onPress={this.onSubmit}
        >
          Submit
        </Button>

        <Text>
          {JSON.stringify(this.state.user)}
          {JSON.stringify(this.state.data)}
        </Text>
      </View>
    );
  }
}
