import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { SignOut } from './SignOut';

// tslint:disable-next-line:no-empty
const history = () => {};
// tslint:disable-next-line:no-empty
const signOut = () => {};

describe('Testing <SignOut />', () => {
  it('should render null', () => {
    const wrapper = shallow(<SignOut signOut={signOut} history={history} />);
    expect(wrapper.type()).toEqual(null);
  });
});