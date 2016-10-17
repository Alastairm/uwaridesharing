import React, { PropTypes } from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {TextInput} from 'react-native';
import UserInput from './UserInput.js';

function f( val) {
  console.log(val);
}

describe('<UserInput />', () =>{
  beforeEach( () => {
    component = shallow(<UserInput field="name" onChange={f}/>);
  });
  it('it should render a TextInput component', () => {
    expect(component.find(TextInput)).to.have.length(1);
  });
  it('it should require a prop called "field"', () => {
    expect(UserInput.PropTypes.field).to.equal(PropTypes.string.isRequired)
  });

});
