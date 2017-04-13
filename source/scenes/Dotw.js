// temporry solution for the demo, just in case we do not finish in time :)
import React from 'react';
import { Image } from 'react-native';

export default function Driverontheway() {
  const pic = {
    url: 'http://www.pickmyride.com.au/images/screenshots/2.jpg',
  };
  return (
    <Image source={pic} style={{ width: 500, height: 500 }} />
  );
}
