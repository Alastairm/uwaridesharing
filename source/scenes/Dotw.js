//temporry solution for the demo, just in case we do not finish in time :)
import React, { Component } from 'react';
import { AppRegistry, Image } from 'react-native';

export default class Driverontheway extends Component{
  render(){
    let pic = {
      url: 'http://www.pickmyride.com.au/images/screenshots/2.jpg'
    };
    return(
      <Image source={pic} style={{width:500, height: 500}}/>
  )}
}
