import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import UserInput from '../components/UserInput.js';
import Map from './Map.js'
import Styles from './Styles.js'


export default class UserForm extends Component {
  constructor(props) {
    super(props);
      // ToDO: Check if user information is already saved
      this.state = {
        user: {
          'name': false,
          'email': false,
          'phone': false,
        },
        valid: false,
        submitted: false
      }
    this.onNext = this.onNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: Map
    });
  }
  onChange(field, val, valid) {
    user = this.state.user;
    user[field] = (valid ? val: false); // Only save value if valid, otherwise  false
    this.setState({user: user});
  }
  async save() {
    await AsyncStorage.setItem('user.saved', 'true');
    await AsyncStorage.setItem('user.name', this.state.user.name);
    await AsyncStorage.setItem('user.email', this.state.user.email);
    await AsyncStorage.setItem('user.phone', this.state.user.phone)
  }
  async onSubmit() {
    let hasName = this.state.user.name;
    let hasEmail = this.state.user.email;
    let hasPhone = this.state.user.phone;
    if (hasName && hasEmail && hasPhone) { // If all fields are valid, save & goto next scene
      this.save();
      onNext();
    } else { // If not all fields are valid display error messages for invalid fields
      this.setState({showErrors: true})
    }
  }
  render() {
    return (
      <View>
        <UserInput
          field ="name"
          onChange={this.onChange}
          showError={this.state.showErrors}/>
        <UserInput
          field ="email"
          onChange={this.onChange}
          showError={this.state.showErrors}/>
        <UserInput
          field ="phone"
          onChange={this.onChange}
          showError={this.state.showErrors}/>
        <View style={Styles.buttonContainer}>
          <Button
            containerStyle={Styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onSubmit}>
            Submit
          </Button>
        </View>

        <Text>
          {JSON.stringify(this.state.user)}
          {JSON.stringify(this.state.data)}
        </Text>
      </View>
    );
  }
}
