import React from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function LocationSearch(props) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      listViewDisplayed="auto"    // true/false/undefined
      fetchDetails
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        // eslint-disable-next-line react/prop-types
        props.onPress(data, details);
      }}
      getDefaultValue={() => ''} // text input default value
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyD430G_Q9_DsbPaTNNMTEpEo-Z06pUm0fc',
        language: 'en', // language of the results
        types: '',  // default: 'geocode'
        location: ' -31.980101,115.818650',
        radius: '150',
        components: 'country:au',
      }}
      styles={{
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}

      // Will add a 'Current location' button at the top of the predefined places list
      currentLocation={false}
      currentLocationLabel="Current location"

      // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      nearbyPlacesAPI="GoogleReverseGeocoding"
      GoogleReverseGeocodingQuery={{
        key: 'AIzaSyD430G_Q9_DsbPaTNNMTEpEo-Z06pUm0fc',
        language: 'en',
        region: 'au',
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food',
      }}


      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

    />
  );
}
