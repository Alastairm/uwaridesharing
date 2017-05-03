import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SignUp from '../source/scenes/SignUp.js';

require('firebase');


test('Matches snapshot', () => {
  const render = renderer.create(
    <SignUp />,
  ).toJSON();
  expect(render).toMatchSnapshot();
});
