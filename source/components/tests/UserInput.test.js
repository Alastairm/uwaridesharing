import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UserInput from '../UserInput.js';

test('Name field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="name" />,
  ).toJSON();
  expect(component).toMatchSnapshot();
});
test('Email field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="email" />,
  ).toJSON();
  expect(component).toMatchSnapshot();
});
test('Phone field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="phone" />,
  ).toJSON();
  expect(component).toMatchSnapshot();
});
