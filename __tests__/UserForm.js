import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import UserForm from '../source/scenes/UserForm.js';


test('Matches snapshot', () => {
  const app = renderer.create(
    <UserForm />,
  ).toJSON();
  expect(app).toMatchSnapshot();
});
