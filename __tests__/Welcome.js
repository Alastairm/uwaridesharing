import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Welcome from '../source/scenes/Welcome.js';


test('Matches snapshot', () => {
  const app = renderer.create(
    <Welcome />,
  ).toJSON();
  expect(app).toMatchSnapshot();
});
