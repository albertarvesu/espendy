import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';

import Landing from './Landing';

describe('Testing <Landing />', () => {
  it('renders the skeletons of landing element', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<Landing hasError={false} signIn={() => {}}  />);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.hasClass('auth')).toEqual(true);
    expect(wrapper.find('.wrapper').length).toEqual(1);
    expect(wrapper.find('.error').length).toEqual(0);
  });
  it('renders facebook and google buttons', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<Landing hasError={false} signIn={() => {}}  />);
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('.facebook').length).toEqual(1);
    expect(wrapper.find('.google').length).toEqual(1);
  });
  it('renders the error message if hasError=true', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<Landing hasError={true} error="This is an error message" signIn={() => {}}  />);
    expect(wrapper.find('.error').text()).toEqual('This is an error message');
  });
});