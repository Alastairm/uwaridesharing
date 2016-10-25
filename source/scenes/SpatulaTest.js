import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

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
    let data = await this.spatula.submit(vendible);
    this.setState({submit: data});
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
        <View style={Styles.buttonContainer}>
          <Button
            containerStyle={Styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.slug}>
            slugVendible
          </Button>
        </View>
        <View style={Styles.buttonContainer}>
          <Button
            containerStyle={Styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.submit}>
            submit
          </Button>
        </View>
      </View>
    )
  }
}
