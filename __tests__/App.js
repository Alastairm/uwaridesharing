import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../source/scenes/App.js';


test('renders correctly', () => {
  const app = renderer.create(
    <App />
  ).toJSON();
  expect(app).toMatchSnapshot();
});
