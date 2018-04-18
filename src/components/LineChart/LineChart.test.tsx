import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import LineChart from './LineChart';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryLine } from 'victory';

describe('Testing <LineChart />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(
      <LineChart
        expensesByDate={{'1': 1}}
        incomesByDate={{'2': 2}}
      />
    );
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.childAt(0).type()).toEqual(VictoryChart);
    expect(wrapper.find(VictoryLegend).length).toEqual(1);
    expect(wrapper.find(VictoryAxis).length).toEqual(2);
    expect(wrapper.find(VictoryLine).length).toEqual(2);
  });
});