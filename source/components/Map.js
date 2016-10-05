import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    this.onRegionChange = this.onRegionChange.bind(this);
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
      </View>
    );
  }
}
