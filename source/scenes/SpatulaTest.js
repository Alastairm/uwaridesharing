import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Button from 'native-base';
import Styles from './Styles.js';
import Spatula from '../apis/spatula.js';
import Stripe from '../apis/stripe.js';

export default class SpatulaTest extends Component {
  constructor(props) {
    super(props);
    this.spatula = new Spatula();
    this.stripe = new Stripe();
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
    const data = await this.spatula.slugVendible();
    this.setState({ vendible: data });
    this.setState({ vendibleID: data.id });
  }
  async submit() {
    const vendible = this.state.vendibleID;
    const location = await this.spatula.getEndpointLocation();
    const user = await this.spatula.getUser();
    const data = await this.spatula.submit(vendible, location, user);
    this.setState({ submit: data });
  }
  async confirm() {
    const CC = {
      number: 4242424242424242,
      exp_month: 12,
      exp_year: 17,
      cvc: 123,
    };
    const stripe = await this.stripe.token(CC.number, CC.exp_month, CC.exp_year, CC.cvc);
    this.setState({ stripe });
    const token = this.state.submit.token;
    const data = await this.spatula.confirm(token, stripe.id);
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
