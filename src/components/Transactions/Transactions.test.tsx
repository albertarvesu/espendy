import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';

import { TransactionInterface } from './../../models';
import { Transactions } from './Transactions';

describe('Testing <Transactions />', () => {
  it('renders the element', () => {
    const wrapper = shallow(<Transactions transactions={[]} />);
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find('.lead').length).toEqual(1);
    expect(wrapper.find('.header').length).toEqual(1);
    expect(wrapper.find('.header h5').text()).toEqual('Transactions');
    expect(wrapper.find('.lists').length).toEqual(1);
    expect(wrapper.find('.lists').type()).toEqual('table');
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
    const wrapper = shallow(<Transactions transactions={transactions} />);
    expect(wrapper.find('.lists tr').length).toEqual(3);
    expect(wrapper.find('.category').length).toEqual(2);
  });
});