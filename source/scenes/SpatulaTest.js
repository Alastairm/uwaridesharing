import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button.js';
import Styles from './Styles.js';
import Spatula from '../apis/spatula.js';

export default class SpatulaTest extends Component {
  constructor(props) {
    super(props);
    this.spatula = new Spatula();
    this.slug = this.slug.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {vendible: {id:'123'}, submit: ""}
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
  async confirm() {

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
          {JSON.stringify(this.state)}
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
