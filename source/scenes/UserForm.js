import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import UserInput from '../components/UserInput.js';
import Map from './Map.js'

const styles = StyleSheet.create({
  container: {
  },
  buttonBox: {
    padding:10,
    height:45,
    width:320,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'steelblue'},
  buttonContainer: {
    height: 60,
    alignItems: 'center'
  }
});

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
    await AsyncStorage.setItem('user', JSON.stringify(this.state.user));
  }
  async onRead() {
    let value = await AsyncStorage.getItem('user')
    this.setState({data:value});
  }
  render() {
    return (
      <View style={styles.container}>
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
        {this.state.data}
        </Text>
      </View>
    );
  }
}
