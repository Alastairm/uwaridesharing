import React, { Component, Proptypes} from 'react';
import { AsyncStorage, StyleSheet,Text,View,Image } from 'react-native';
import MapView from 'react-native-maps';
import Button from '../components/Button.js';

import Styles from './Styles.js';
import Spatula from '../apis/spatula.js';
import CreditCardForm from './CreditCardForm.js';
const uwaLoc = {latitude:-31.981179, longitude:115.81991}
const defaultZoom = {latitudeDelta: 0.0045, longitudeDelta: 0.006}

export default class FareEstimation extends Component{
  constructor(props) {
    super(props);
    this.spatula = new Spatula();
    this.state = {
      region: {
        latitude: -31.981179,
        longitude: 115.81991,
        latitudeDelta: defaultZoom.latitudeDelta,
        longitudeDelta: defaultZoom.longitudeDelta,
      },
      endpoint: {
        latitude: 0,
        longitude: 0
      },
      price:
      {
        total: '0.00',
        base: '0.00',
        distance: '0.00',
        time: '0.00'
      },
      payee: "",
      token: "",
      data: ""
    };
    this.setUpMap = this.setUpMap.bind(this);
    this.onNext = this.onNext.bind(this);
    this.spatulaSubmit = this.spatulaSubmit.bind(this);
    this.updateEstimate = this.updateEstimate.bind(this);
    this.processPrice = this.processPrice.bind(this);
  }
  async componentWillMount() {
    this.setUpMap();
    this.spatulaSubmit();
  }
  setUpMap() {
    var region = this.state.region;
    var endpoint = {latitude: 0, longitude: 0};
    AsyncStorage.getItem('endpoint.lat').then((lat) => {
      endpoint.latitude = parseFloat(lat);
      let latitudeDelta = uwaLoc.latitude-endpoint.latitude;
      region.latitude = uwaLoc.latitude-(latitudeDelta)/2;
      region.latitudeDelta = Math.abs(latitudeDelta)*2;
    });
    AsyncStorage.getItem('endpoint.lon').then((lon) => {
      endpoint.longitude = parseFloat(lon);
      let longitudeDelta = uwaLoc.longitude - endpoint.longitude;
      region.longitude = uwaLoc.longitude-(longitudeDelta)/2;
      region.longitudeDelta = Math.abs(longitudeDelta)*2;
      this.setState({endpoint: endpoint});
      this.setState({region: region});
    });
  }
  async spatulaSubmit() {
    let userName = await AsyncStorage.getItem('user.name');
    let userEmail = await AsyncStorage.getItem('user.email');
    let userPhone = await AsyncStorage.getItem('user.phone');
    let il8nPhone = '+61'+userPhone.slice(1);
    let user = {
      name: userName,
      email: userEmail,
      phone: il8nPhone
    }
    let location = {
      name:"empty",
      lat:null,
      lon:null,
      address:"empty",
      radius:1000
    };
    let latitude = await AsyncStorage.getItem('endpoint.lat');
    let longitude = await AsyncStorage.getItem('endpoint.lon')
    location.lat = parseFloat(latitude);
    location.lon = parseFloat(longitude);
    let vendible = await AsyncStorage.getItem('vendible');
    vendible = parseInt(vendible);
    this.setState({vendible: vendible});
    let data = await this.spatula.submit(vendible, location, user);
    this.updateEstimate(data.price);
    this.setState({data: data})
    this.setState({token: data.token});
  }
  updateEstimate(price) {
    priceState = this.state.price
    priceState.total = this.processPrice(price.total.amount);
    priceState.base = this.processPrice(price.breakdown.base);
    priceState.distance = this.processPrice(price.breakdown.km);
    priceState.distance = this.processPrice(price.breakdown.minutes);

    this.setState(price: priceState)
  }
  processPrice(amount) {
    // Converts spatula amount to strings.
    // e.g. [127080,4] => 12.70
    let number = String(amount[0])
    let decimal = number.length-amount[1];
    let dollars = number.slice(0,decimal);
    if(dollars=="") {
      dollars = "0"
    }
    let cents = number.slice(decimal, decimal+2);
    return dollars + '.' + cents;
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
          region={this.state.region}>
          <MapView.Marker
            coordinate={uwaLoc}/>
          <MapView.Marker
            coordinate={this.state.endpoint}/>
        </MapView>
        <View style={Styles.scene}>
          <View style={Styles.header}>
          </View>
          <View style={styles.footer}>
            <View style={{alignSelf: 'center'}}>
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
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'right'}}>
                Total: {this.state.price.total} AUD
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
