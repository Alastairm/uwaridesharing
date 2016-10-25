import React, { Component, Proptypes} from 'react';
import {AppRegistry,StyleSheet,Text,View,Image } from 'react-native';
import MapView from 'react-native-maps';
import Button from '../components/Button.js';

import Styles from './Styles.js';

import CreditCardForm from './CreditCardForm.js';

export default class FareEstimation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -31.980101,
        longitude: 115.818650,
        latitudeDelta: 0.0045,
        longitudeDelta: 0.006,
      },
    };
    this.onNext = this.onNext.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: CreditCardForm
    });
  }
  render() {
    let locationImage = {
      uri: 'http://a3.mzstatic.com/us/r30/Purple3/v4/25/f7/4b/25f74b97-d3a2-0027-668b-6c82863d09b6/screen568x568.jpeg'};
    return(
      <View style={Styles.mapScene}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          region={this.state.region}
        />
        <View style={Styles.scene}>
          <View style={Styles.header}>
          </View>
          <View style={styles.footer}>
            <View style={{alignSelf: 'center'}}>

              <Text style={Styles.titleText}>
                Estimated Cost
              </Text>
              <Text style={Styles.bodyText}>
                Base Cost .................... 2.00 AUD
              </Text>
              <Text style={Styles.bodyText}>
                Distance ...................... 1.02 AUD
              </Text>
              <Text style={Styles.bodyText}>
                Time ............................ 2.32 AUD
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'right'}}>
                Total: 5.34 AUD
              </Text>

              </View>
              <Button
                onPress={this.onNext}>
                Confirm Ride
              </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create ({
footer: {
  justifyContent: 'flex-end',
  backgroundColor: '#ffffff'
}


});
