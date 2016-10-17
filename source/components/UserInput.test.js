import React from 'react';
import renderer from 'react-test-renderer';
import UserInput from './UserInput.js'
it('Name field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="name"/>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
it('Email field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="email"/>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
it('Phone field matches previous snapshot', () => {
  const component = renderer.create(
    <UserInput field="phone"/>
  ).toJSON();
  expect(component).toMatchSnapshot();
});
