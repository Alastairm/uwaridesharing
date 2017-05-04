import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Welcome from '../source/scenes/Welcome.js';

require('firebase');


test('Matches snapshot', () => {
  const render = renderer.create(
    <Welcome />,
  ).toJSON();
  expect(render).toMatchSnapshot();
});
