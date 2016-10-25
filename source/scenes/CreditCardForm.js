import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { customerFromCard } from '../apis/stripe.js';
import Button from '../components/Button.js';

import FareEstimation from './FareEstimation.js';

secret = "sk_test_jKEt5KSdxsDccE0kqZwpJrwN"; // not sure if wise in production
publishable = 'pk_test_ZyA7ct7H5STJYWjMUbOGTOHS'

export default class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onChange(form) {
    this.setState({form: form})
    if (form.valid == true) {
      let number = form.values.number.replace(/ /g,'');
      number = number;
      let expiry = form.values.expiry.split("/");
      exp_month = expiry[0];
      exp_year = expiry[1];
      cvc = form.values.cvc
    }
  }
  onNext() {
    this.props.navigator.push({
      component: FareEstimation
    });
  }
  onSubmit() {
    if( this.state.form.valid) {
      this.onNext()
    }else {
      this.setState({error: "Please check your credit card details are correct"})
    }
  }
  render() {
    return (
      <View>
        <CreditCardInput
          focues={this.state.focused}
          onChange={this.onChange}
        />
        <Text>
          {this.state.error}
        </Text>
        <Button
          backgroundColor={'#0060C0'}
          onPress={this.onSubmit}>
          Submit
        </Button>
      </View>
    )
  }
}
