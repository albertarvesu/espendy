import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { Home } from './Home';
import Box from '../Box/Box';

import { UserInterface } from '../../reducers';

describe('Testing <Home />', () => {
  it('renders the skeletons of element', () => {
    const currentUser: UserInterface = {
      uid: '',
      email: '',
      displayName: '',
    };
    const wrapper = shallow(
      // tslint:disable-next-line:no-empty
      <Home currentUser={currentUser} getTransactions={() => {}} transactions={[]}  currentBalance={0} />
    );
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.content').length).toEqual(1);
    expect(wrapper.find('.sidebar').length).toEqual(1);

    expect(wrapper.find(Box).length).toEqual(3);
  });
});