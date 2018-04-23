import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import LineChart from './LineChart';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryLine } from 'victory';
import { SettingsInterface } from '../../models';
import * as moment from 'moment';

const settings: SettingsInterface = {
  from: moment().startOf('month').toDate().getTime(),
  to: moment().toDate().getTime(),
  roundingValue: 0,
  currency: 'USD',
};
describe('Testing <LineChart />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(
      <LineChart
        settings={settings}
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