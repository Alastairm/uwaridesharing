import React, { Component, Proptypes} from 'react';
import {AppRegistry,StyleSheet,Text,View,Image } from 'react-native';
import Button from 'react-native-button';
import Styles from './Styles.js';


render() {
  let locationImage = {
    uri: 'http://a3.mzstatic.com/us/r30/Purple3/v4/25/f7/4b/25f74b97-d3a2-0027-668b-6c82863d09b6/screen568x568.jpeg'};
  return(
    <View style={Styles.scene}>
    <View style={{alignSelf: 'center'}}>
      <Image source={locationImage} style={{width: 390, height: 410}}/>

      <Text style={Styles.baseText}>
          <Text style={Styles.titleText}>
            Estimated Cost
          </Text>
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
          <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'left'}}>
                                 Total: 5.34 AUD
          </Text>

      </View>

    </View>
  );
}

};
