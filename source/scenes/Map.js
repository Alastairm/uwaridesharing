import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import MapView from 'react-native-maps';

import LocationSearch from '../components/LocationSearch.js'
import Styles from './Styles.js';
import CreditCardForm from './CreditCardForm';


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
      data: "sutff should be here"
    };
    this.onNext = this.onNext.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onPlaceSelect = this.onPlaceSelect.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: CreditCardForm
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
        <Icon name="location" size={90} color="#900" />

        <View style={Styles.scene}>
          <View style={Styles.header}>
            <TextInput
              style={{backgroundColor: '#FFFFFF'}}
              placeholder="Pickup Location"/>
            <LocationSearch onPress={this.onPlaceSelect}/>
          </View>
          <View style={Styles.footer}>
            <View style={Styles.buttonContainer}>
              <Button
                containerStyle={Styles.buttonBox}
                style={{fontSize: 20, color: 'white'}}
                onPress={this.onNext}>
                Set Pickup Location
              </Button>
            </View>
          </View>
        </View>
        <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-start', alignItems: 'center'}}>
          <Text>
            {JSON.stringify(this.state.data)}
          </Text>
        </View>
      </View>
    );
  }
}
