import * as React from 'react';
import * as moment from 'moment';
import { shallow } from 'enzyme';

import './../../enzymeAdapter';

import { TransactionsModal } from './TransactionsModal';
import { SettingsInterface, TransactionInterface } from '../../models';

const settings: SettingsInterface = {
  from: moment().startOf('month').toDate().getTime(),
  to: moment().toDate().getTime(),
  roundingValue: 0,
  currency: 'USD',
};

describe('Testing <TransactionsModal />', () => {
  it('renders the element', () => {
    const wrapper = shallow(
          // tslint:disable-next-line:no-empty
      <TransactionsModal transactions={[]} settings={settings} incomes={[]} expenses={[]} deleteTransaction={() => {}} />
    );
    expect(wrapper.type()).toEqual('div');
  });
  it('renders transactions correctly', () => {
    const transactions = [
      {
        id: '1',
        date: new Date().getTime(),
        type: 'expenses',
        category: 'egw',
        remarks: 'remarks'
      } as TransactionInterface,
      {
        id: '2',
        date: new Date().getTime(),
        type: 'income',
        category: 'bon',
        remarks: 'bonus'
      } as TransactionInterface
    ];
    const wrapper = shallow(
      // tslint:disable-next-line:no-empty
      <TransactionsModal transactions={transactions} settings={settings} incomes={[]} expenses={[]} deleteTransaction={() => {}} />
    );
    expect(wrapper.find('.lists tr').length).toEqual(3);
    expect(wrapper.find('.category').length).toEqual(2);
  });
});