import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import UserInput from '../components/UserInput.js';
import Map from './Map.js'
import styles from './styles.js'


export default class UserForm extends Component {
  constructor(props) {
    super(props);
      // ToDO: Check if user information is already saved
      this.state = {
        user: {
          'name': "",
          'email':"",
          'phone':"",
        },
        data: "",
      }
    this.onNext = this.onNext.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onRead = this.onRead.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: Map
    });
  }
  onChange(field, val) {
    user = this.state.user;
    user[field] = val;
    this.setState({user: user});
  }
  async onSave() {
    await AsyncStorage.setItem('user.saved', 'true');
    await AsyncStorage.setItem('user.name', this.state.user.name);
    await AsyncStorage.setItem('user.email', this.state.user.email);
    await AsyncStorage.setItem('user.phone', this.state.user.phone)
  }
  async onRead() {
    let userSaved = await AsyncStorage.getItem('user.saved');
    let userName = await AsyncStorage.getItem('user.name');
    let userEmail = await AsyncStorage.getItem('user.email');
    let userPhone = await AsyncStorage.getItem('user.phone');
    this.setState({data: {
      user: {
        saved: userSaved,
        name: userName,
        email: userEmail,
        phone: userPhone
      }
    }});
  }
  async componentDidMount() {
    try{
      let userSaved = await AsyncStorage.getItem('user.saved');
      if (userSaved == 'true') {
        this.onNext();
      }
    } catch(error) {}
  }
  render() {
    return (
      <View>
        <UserInput onChange={this.onChange} field ="name"/>
        <UserInput onChange={this.onChange} field ="email"/>
        <UserInput onChange={this.onChange} field ="phone"/>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onNext}>
            Next Page
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onSave}>
            Save
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onRead}>
              Read Form Data
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
