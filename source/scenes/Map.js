import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/EvilIcons';
import MapView from 'react-native-maps';
import CreditCardForm from './CreditCardForm';
import styles from './styles.js';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -31.980101,
        longitude: 115.818650,
        latitudeDelta: 0.0045,
        longitudeDelta: 0.006,
      }
    };
    this.onNext = this.onNext.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  onNext() {
    this.props.navigator.push({
      component: CreditCardForm
    });
  }
  onRegionChange(region) {
    this.setState({region: region});
  }
  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style={styles.mapScene}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          >
        </MapView>
        <Icon name="location" size={90} color="#900" />

        <View style={styles.mapOverlay}>
          <View style={styles.header}>
            <TextInput
              style={{backgroundColor: '#FFFFFF'}}
              placeholder="Pickup Location"/>
          </View>
          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <Button
                containerStyle={styles.buttonBox}
                style={{fontSize: 20, color: 'white'}}
                onPress={this.onNext}>
                Set Pickup Location
              </Button>
            </View>
          </View>
        </View>

      </View>
    );
  }
}
