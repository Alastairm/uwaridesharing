import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {form: "", focused: "number"};
    this.onChange = this.onChange.bind(this);
  }
  onChange(form) {
    this.setState({form: form})
  }

  render() {
    return (
      <View>
        <CreditCardInput
          focues={this.state.focused}
          onChange={this.onChange}
        />
        <Text>
          {JSON.stringify(this.state)}
        </Text>
      </View>
    )
  }
}
