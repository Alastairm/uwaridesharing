import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import CreditCardForm from './CreditCardForm';


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBox: {
    padding:10,
    height:45,
    width:320,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'steelblue'},
  buttonContainer: {
    height: 60,
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


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
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
        </MapView>
        <View style={styles.buttonContainer}>
          <Button
            containerStyle={styles.buttonBox}
            style={{fontSize: 20, color: 'white'}}
            onPress={this.onNext}>
              Set Pickup Location
          </Button>
        </View>
      </View>
    );
  }
}
