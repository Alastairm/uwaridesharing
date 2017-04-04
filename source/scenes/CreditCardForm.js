import React, { Component, Proptypes } from 'react';
import { Text, View } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
// import { customerFromCard } from '../apis/stripe.js';
import Button from '../components/Button.js';

import Driverontheway from './Dotw.js';


export default class CreditCardForm extends Component {
  static get propTypes() {
    return {
      navigator: Proptypes.shape({
        push: Proptypes.object,
      }).isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      form: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onChange(form) {
    this.setState({ form });
    // Below does nothing, just to show format of data.
    // if (form.valid == true) {
    //   const number = form.values.number.replace(/ /g,'');
    //   const expiry = form.values.expiry.split('/');
    //   const expMonth = expiry[0];
    //   const expYear = expiry[1];
    //   const cvc = form.values.cvc
    // }
  }
  onNext() {
    this.props.navigator.push({
      component: Driverontheway,
    });
  }
  onSubmit() {
    if (this.state.form.valid) {
      this.onNext();
    } else {
      this.setState({ error: 'Please check your credit card details are correct' });
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
          onPress={this.onSubmit}
        >
          Submit
        </Button>
      </View>
    );
  }
}
