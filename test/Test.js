
import {shallow} from 'enzyme';
import {expect} from 'chai';

import React, { View, Text } from 'react-native';
import Test from '../components/Test.jsx';

describe('<Test />', () => {
  it('it should render 1 view component', () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should render 2 text components', () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find(Text)).to.have.length(2);
  });
  it('do we get a slack notification when it breaks?', () => {
    const wrapper = shallow(<Test/>);
    expect(wrapper.find(Text)).to.have.length(3);
  });
});
