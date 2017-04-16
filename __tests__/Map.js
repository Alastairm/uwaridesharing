import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Map from '../source/scenes/Map.js';

// Need to mock react-native-maps.
jest.mock('react-native-maps', () => 'MapView');

test('Matches snapshot', () => {
  const render = renderer.create(
    <Map />,
  ).toJSON();
  expect(render).toMatchSnapshot();
});
