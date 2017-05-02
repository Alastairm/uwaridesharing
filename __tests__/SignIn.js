import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SignIn from '../source/scenes/SignIn.js';

jest.mock('firebase');


test('Matches snapshot', () => {
  const render = renderer.create(
    <SignIn />,
  ).toJSON();
  expect(render).toMatchSnapshot();
});
