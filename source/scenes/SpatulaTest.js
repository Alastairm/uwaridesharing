import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Button from 'native-base';
import Styles from './Styles.js';
import { SpatulaVendible, SpatulaSubmit, SpatulaConfirm,
         SpatulaUser, SpatulaEndpointLocation } from '../apis/spatula.js';
import StripeToken from '../apis/stripe.js';

export default class SpatulaTest extends Component {
  constructor(props) {
    super(props);
    this.slug = this.slug.bind(this);
    this.submit = this.submit.bind(this);
    this.confirm = this.confirm.bind(this);
    this.state = {
      vendible: '',
      vendibleID: '',
      submit: '',
      confirm: '',
      stripe: { id: '' },
    };
  }
  async slug() {
    const data = await SpatulaVendible();
    this.setState({ vendible: data });
    this.setState({ vendibleID: data.id });
  }
  async submit() {
    const vendible = this.state.vendibleID;
    const location = await SpatulaEndpointLocation();
    const user = await SpatulaUser();
    const data = await SpatulaSubmit(vendible, location, user);
    this.setState({ submit: data });
  }
  async confirm() {
    const CC = {
      number: 4242424242424242,
      exp_month: 12,
      exp_year: 17,
      cvc: 123,
    };
    const stripe = await StripeToken(CC.number, CC.exp_month, CC.exp_year, CC.cvc);
    this.setState({ stripe });
    const token = this.state.submit.token;
    const data = await SpatulaConfirm(token, stripe.id);
    this.setState({ confirm: data });
  }
  render() {
    return (
      <View style={Styles.scene}>
        <Text>
          {JSON.stringify(this.state.vendible)}
        </Text>
        <Text>
          {JSON.stringify(this.state.submit)}
        </Text>
        <Text>
          {JSON.stringify(this.state.stripe.id)}
          {JSON.stringify(this.state.confirm)}
        </Text>
        <Button
          onPress={this.slug}
        >
          slugVendible endpoint
        </Button>
        <Button
          onPress={this.submit}
        >
          submit endpoint
        </Button>
        <Button
          onPress={this.confirm}
        >
          confirm endpoint
        </Button>
      </View>
    );
  }
}
