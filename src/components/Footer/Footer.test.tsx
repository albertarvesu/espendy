import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Testing <Home />', () => {
  it('should render the element', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.type()).toEqual('div');
  });
});