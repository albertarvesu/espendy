import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import * as moment from 'moment';

import { FixedExpenses } from './FixedExpenses';
import { SettingsInterface, TransactionInterface } from './../../models';

const settings: SettingsInterface = {
  from: moment().startOf('month').toDate().getTime(),
  to: moment().toDate().getTime(),
  roundingValue: 0,
  currency: 'USD',
};

describe('Testing <FixedExpenses />', () => {
  it('renders the element with no fixed expenses', () => {
    const wrapper = shallow(
      <FixedExpenses settings={settings} fixedExpenses={[]} />
    );
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find('.nofixed').length).toEqual(1);
    expect(wrapper.find('table').length).toEqual(0);
  });
  it('renders the element with fixed expenses', () => {
    const fixed = [
      { type: 'expenses', category: 'egw', amount: 10 } as TransactionInterface,
      { type: 'expenses', category: 'hrm', amount: 20 } as TransactionInterface
    ];
    const wrapper = shallow(
      <FixedExpenses settings={settings} fixedExpenses={fixed} />
    );
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('tr').length).toEqual(3);
    expect(wrapper.find('.nofixed').length).toEqual(0);
  });
});