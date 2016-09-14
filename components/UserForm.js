import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
// import store from 'react-native-simple-store';
import UserInput from './UserInput.js';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: 200,
  },
  buttonContainer: {
    padding:10,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'steelblue'}
});

export default class UserForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userData: {
          'name': "",
          'email':"",
          'phone':"",
        },
        data: "",
      }
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(field, val) {
    userData = this.state.userData;
    userData[field] = val;
    this.setState({userData: userData});
  }
  onNext() {
    this.props.navigator.push({
      component: CheckForm
    });
  }
  onSave() {
    AsyncStorage.setItem('userData', JSON.stringify(this.state.userData));
  }
  render() {
    return (
      <View style={styles.container}>
        <UserInput onChange={this.onChange} field ="name"/>
        <UserInput onChange={this.onChange} field ="email"/>
        <UserInput onChange={this.onChange} field ="phone"/>
        <Button
          containerStyle={styles.buttonContainer}
          style={{fontSize: 20, color: 'white'}}
          onPress={this.onNext}>
          Next Page
        </Button>
        <Button
          containerStyle={styles.buttonContainer}
          style={{fontSize: 20, color: 'white'}}
          onPress={this.onSave}>
          Save
        </Button>
      </View>
    );
  }
}


class CheckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ""}
    this.onBackPress = this.onBackPress.bind(this);
    this.onRead = this.onRead.bind(this);
  }
  onBackPress() {
    this.props.navigator.pop();
  }
  onRead() {
    AsyncStorage.getItem('userData')
    .then( (value) => {
        this.setState({data:value});
      }).done();
  }
  render() {
    return(
      <View>
        <Button
        containerStyle={styles.buttonContainer}
        style={{fontSize: 20, color: 'white'}}
        onPress={this.onBackPress}>
          Back
        </Button>
        <Button
          containerStyle={styles.buttonContainer}
          style={{fontSize: 20, color: 'white'}}
          onPress={this.onRead}>
            Read Form Data
        </Button>
        <Text>
        {this.state.data}
        </Text>
      </View>
    );
  }
}
