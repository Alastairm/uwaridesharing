import 'react-native';
import React from 'react';
import App from '../source/scenes/App.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const app = renderer.create(
    <App />
  ).toJSON();
  expect(app).toMatchSnapshot();
});
