import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Body, Button, Col, Container, Grid, Header, Left, Right, Title } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

// import Button from '../components/Button.js';
import LocationSearch from '../components/LocationSearch.js';
import { Styles, NativeStyles } from './Styles.js';

import Dotw from './Dotw.js';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { uid: null },
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
    this.pushJob = this.pushJob.bind(this);
  }
  async onNext() {
    const uid = await AsyncStorage.getItem('user.uid');
    const ref = await firebase.database().ref(`users/${uid}/`);
    // Create dispatch callback fn to show tracking once job is in spatula.

    // Push the job to Firebase backend.
    this.pushJob(ref);
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
  async pushJob(ref) {
    ref.child('job').set({
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    }).then(() => {
      // Navigator should use context instead of props.
      // eslint-disable-next-line
      this.props.navigator.push({
        component: Dotw,
      });
    });
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Book a Ride</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="bars" />
            </Button>
          </Right>
        </Header>
        <View style={Styles.mapScene}>
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
          <Icon name="map-marker" size={50} color="#0060C0" />
          <View style={Styles.scene}>
            <View style={Styles.header}>
              <LocationSearch onPress={this.onLocationSeach} justifyContent={'flex-start'} />
            </View>
            <View style={Styles.footer}>
              <Button rounded style={NativeStyles.button} marginLeft={'25%'} backgroundColor={'#0060C0'} onPress={this.onNext}>
                <Text> Set Pickup Location </Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
