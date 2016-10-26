import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button.js';
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
      vendible: "",
      vendibleID: "",
      submit: "",
      confirm: "",
      stripe: {id: ""}
    }
  }
  async slug() {
    let data = await this.spatula.slugVendible();
    this.setState({vendible: data});
    this.setState({vendibleID: data.id})
  }
  async submit() {
    let vendible = this.state.vendibleID;
    let location = await this.spatula.getEndpointLocation();
    let user = await this.spatula.getUser();
    let data = await this.spatula.submit(vendible, location, user);
    this.setState({submit: data});
  }
  async confirm(number) {
    let CC = {
      number: 4242424242424242,
      exp_month: 12,
      exp_year: 17,
      cvc: 123
    }
    let stripe = await this.stripe.token(CC.number, CC.exp_month, CC.exp_year, CC.cvc);
    this.setState({stripe: stripe})
    let token = this.state.submit.token;
    let data = await this.spatula.confirm(token, stripe.id);
    this.setState({confirm: data})
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
            onPress={this.slug}>
            slugVendible endpoint
          </Button>
          <Button
            onPress={this.submit}>
            submit endpoint
          </Button>
          <Button
            onPress={this.confirm}>
            confirm endpoint
          </Button>
      </View>
    )
  }
}
