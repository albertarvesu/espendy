import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import Home from './Home';
import Box from '../Box/Box';

describe('Testing <Home />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.content').length).toEqual(1);
    expect(wrapper.find('.sidebar').length).toEqual(1);

    expect(wrapper.find(Box).length).toEqual(2);
  });
});