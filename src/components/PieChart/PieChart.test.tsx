import * as React from 'react';
import { shallow } from 'enzyme';
import { VictoryPie } from 'victory';
import './../../enzymeAdapter';
import PieChart from './PieChart';

import { TransactionInterface } from '../../reducers';

describe('Testing <PieChart />', () => {
  it('renders the element', () => {
    const wrapper = shallow(
      <PieChart expenses={[]} totalExpenses={100} />
    );
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find(VictoryPie).props().data).toEqual([]);
  });
  it('renders element with data', () => {
    const wrapper = shallow(
      <PieChart
        expenses={[
          { type: 'expenses', category: 'egw', amount: 10 } as TransactionInterface,
          { type: 'expenses', category: 'hrm', amount: 20 } as TransactionInterface
        ]}
        totalExpenses={100}
      />
    );
    expect(wrapper.find(VictoryPie).props().data).toEqual([
      { x: 'EGW', y: 10 }, { x: 'HRM', y: 20 }
    ]);
  });
});