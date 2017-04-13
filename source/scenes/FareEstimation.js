import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Button from 'native-base';

import Styles from './Styles.js';
import { SpatulaVendible, SpatulaSubmit, SpatulaUser, SpatulaEndpointLocation } from '../apis/spatula.js';
import CreditCardForm from './CreditCardForm.js';

const uwaLoc = { latitude: -31.981179, longitude: 115.81991 };
const defaultZoom = { latitudeDelta: 0.0045, longitudeDelta: 0.006 };

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
  },
});

function processPrice(amount) {
  // Converts spatula amount to strings.
  // e.g. [127080,4] => 12.70
  const number = String(amount[0]);
  const decimal = number.length - amount[1];
  let dollars;
  let cents;
  if (decimal > 0) {
    dollars = number.slice(0, decimal);
    cents = number.slice(decimal, decimal + 2);
  } else if (decimal === 0) {
    dollars = '0';
    cents = number.slice(decimal, decimal + 2);
  } else if (decimal < 0) {
    dollars = '0';
    cents = '00';
  }
  return `${dollars},${cents}`;
}

export default class FareEstimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -31.981179,
        longitude: 115.81991,
        latitudeDelta: defaultZoom.latitudeDelta,
        longitudeDelta: defaultZoom.longitudeDelta,
      },
      endpoint: {
        latitude: 0,
        longitude: 0,
      },
      price:
      {
        total: '0.00',
        base: '0.00',
        distance: '0.00',
        time: '0.00',
      },
      payee: '',
      token: '',
      data: '',
    };
    this.setUpMap = this.setUpMap.bind(this);
    this.onNext = this.onNext.bind(this);
    this.spatulaSubmit = this.spatulaSubmit.bind(this);
    this.updateEstimate = this.updateEstimate.bind(this);
  }
  async componentWillMount() {
    this.setUpMap();
    this.spatulaSubmit();
  }
  onNext() {
    // eslint-disable-next-line
    this.props.navigator.push({
      component: CreditCardForm,
    });
  }
  setUpMap() {
    const region = this.state.region;
    const endpoint = { latitude: 0, longitude: 0 };
    AsyncStorage.getItem('endpoint.lat').then((lat) => {
      endpoint.latitude = parseFloat(lat);
      const latitudeDelta = uwaLoc.latitude - endpoint.latitude;
      region.latitude = uwaLoc.latitude - (latitudeDelta / 2);
      region.latitudeDelta = Math.abs(latitudeDelta) * 2;
    });
    AsyncStorage.getItem('endpoint.lon').then((lon) => {
      endpoint.longitude = parseFloat(lon);
      const longitudeDelta = uwaLoc.longitude - endpoint.longitude;
      region.longitude = uwaLoc.longitude - (longitudeDelta / 2);
      region.longitudeDelta = Math.abs(longitudeDelta) * 2;
      this.setState({ endpoint });
      this.setState({ region });
    });
  }
  async spatulaSubmit() {
    const vendible = await SpatulaVendible();
    const location = await SpatulaEndpointLocation();
    const user = await SpatulaUser();
    const data = await SpatulaSubmit(vendible, location, user);
    this.updateEstimate(data.price);
    this.setState({ token: data.token });
    await AsyncStorage.setItem('spatula.confirm.token', this.state.token);
  }
  updateEstimate(price) {
    const priceState = this.state.price;
    priceState.total = processPrice(price.total.amount);
    priceState.base = processPrice(price.breakdown.base);
    priceState.distance = processPrice(price.breakdown.km);
    priceState.time = processPrice(price.breakdown.minutes);
    this.setState(price: priceState);
  }
  render() {
    return (
      <View style={Styles.mapScene}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={this.state.region}
        >
          <MapView.Marker
            coordinate={uwaLoc}
          />
          <MapView.Marker
            coordinate={this.state.endpoint}
          />
        </MapView>
        <View style={Styles.scene}>
          <View style={Styles.header} />
          <View style={styles.footer}>
            <View style={{ alignSelf: 'center' }}>
              <Text style={Styles.titleText}>
                Estimated Cost
              </Text>
              <Text style={Styles.bodyText}>
                Base Cost .................... {this.state.price.base} AUD
              </Text>
              <Text style={Styles.bodyText}>
                Distance ...................... {this.state.price.distance} AUD
              </Text>
              <Text style={Styles.bodyText}>
                Time ............................ {this.state.price.time} AUD
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'right' }}>
                Total: {this.state.price.total} AUD
              </Text>
            </View>
            <Button
              onPress={this.onNext}
            >
              Confirm Ride
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
