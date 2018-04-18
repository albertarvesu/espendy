import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { Home } from './Home';
import Box from '../Box/Box';

import { UserInterface, TransactionInterface } from '../../reducers';

describe('Testing <Home />', () => {
  it('renders the skeletons of element', () => {
    const currentUser: UserInterface = {
      uid: '',
      email: '',
      displayName: '',
    };
    const wrapper = shallow(
      <Home
        currentUser={currentUser}
        // tslint:disable-next-line:no-empty
        getTransactions={() => {}}
        currentBalance={0}
        transactions={[]}
        expensesByDate={{}}
        incomesByDate={{}}
      />
    );
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.content').length).toEqual(1);
    expect(wrapper.find('.sidebar').length).toEqual(1);

    expect(wrapper.find(Box).length).toEqual(2);
  });
  it('renders transactions if not empty', () => {
    const currentUser: UserInterface = {
      uid: '',
      email: '',
      displayName: '',
    };
    const wrapper = shallow(
      <Home
        currentUser={currentUser}
        // tslint:disable-next-line:no-empty
        getTransactions={() => {}}
        currentBalance={0}
        transactions={[
          { amount: 10, type: 'expenses', category: 'egw' } as TransactionInterface
        ]}
        expensesByDate={{'1': 1}}
        incomesByDate={{'2': 2}}
      />
    );
    expect(wrapper.find(Box).length).toEqual(4);
  });
});