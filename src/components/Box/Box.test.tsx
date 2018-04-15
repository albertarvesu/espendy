import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import Box from './Box';
import { Link } from 'react-router-dom';

describe('Testing <Home />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(<Box type="lr" clazz="balance" />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.hasClass('balance')).toEqual(true);
    expect(wrapper.hasClass('box-lr')).toEqual(true);
  });
  it('renders <Link /> if path were supplied', () => {
    const wrapper = shallow(<Box path="/path" type="lr" clazz="balance" />);
    expect(wrapper.type()).toEqual(Link);
    expect(wrapper.props().to).toEqual('/home/path');
    expect(wrapper.hasClass('balance')).toEqual(true);
    expect(wrapper.hasClass('box')).toEqual(true);
  });
});