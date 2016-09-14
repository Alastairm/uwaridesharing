import {shallow} from 'enzyme';
import {expect} from 'chai';
import React from 'react';
import {TextInput} from 'react-native';
import UserInput from '../components/UserInput.js';

function f( val) {
  console.log(val);
}

describe('<UserInput />', () =>{
  it('it should render a TextInput component', () => {
    const component = shallow(<UserInput field="name" onChange={f}/>);
    expect(component.find(TextInput)).to.have.length(1);
  });
  it('it should require a prop called "field"')
});
