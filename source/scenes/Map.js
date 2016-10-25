import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import Button from '../components/Button.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import LocationSearch from '../components/LocationSearch.js'
import Styles from './Styles.js';

import FareEstimation from './FareEstimation.js';

export default class Map extends React.Component {
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
    this.onPlaceSelect = this.onPlaceSelect.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: FareEstimation
    });
  }
  onRegionChange(region) {
    this.setState({region: region});
  }
  onPlaceSelect(data, details){
    this.setState({data: {location: details.geometry.location}});
    let region = this.state.region
    region.latitude = parseFloat(details.geometry.location.lat);
    region.longitude = parseFloat(details.geometry.location.lng);
    this.setState({region: region})
  }
  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={Styles.mapScene}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          >
        </MapView>
        <Icon name="map-marker" size={50} color="#0060C0" />
        <View style={Styles.scene}>
          <View style={Styles.header}>
            <LocationSearch onPress={this.onPlaceSelect}/>
          </View>
          <View style={Styles.footer}>
            <Button
              backgroundColor={'#0060C0'}
              onPress={this.onNext}>
              Set Pickup Location
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
