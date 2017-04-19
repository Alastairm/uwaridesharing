import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import Button from '../components/Button.js';
import LocationSearch from '../components/LocationSearch.js';
import Styles from './Styles.js';

import Dotw from './Dotw.js';

export default class Map extends Component {
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
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onLocationSeach = this.onLocationSeach.bind(this);
  }
  async onNext() {
    await AsyncStorage.setItem('endpoint.lat', String(this.state.region.latitude));
    await AsyncStorage.setItem('endpoint.lon', String(this.state.region.longitude));
    // Navigator should use context instead of props.
    // eslint-disable-next-line
    this.props.navigator.push({
      component: Dotw,
    });
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  onLocationSeach(data, details) {
    this.setState({ data: { location: details.geometry.location } });
    const region = this.state.region;
    region.latitude = parseFloat(details.geometry.location.lat);
    region.longitude = parseFloat(details.geometry.location.lng);
    this.setState({ region });
  }
  render() {
    return (
      <View style={Styles.mapScene}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <Icon name="map-marker" size={50} color="#0060C0" />
        <View style={Styles.scene}>
          <View style={Styles.header}>
            <LocationSearch onPress={this.onLocationSeach} />
          </View>
          <View style={Styles.footer}>
            <Button
              backgroundColor={'#0060C0'}
              onPress={this.onNext}
            >
              Set Pickup Location
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
