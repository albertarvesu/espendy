import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { Insights, InsightsItem } from './Insigths';

describe('Testing <Insights />', () => {
  it('renders the element', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(
      <Insights monthTotalExpenses={0} weekTotalExpenses={0} monthTotalIncome={0} weekTotalIncome={0} />
    );
    expect(wrapper.type()).toEqual(InsightsItem);
  });
  it('renders nothing if items is empty', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(
      <Insights monthTotalExpenses={0} weekTotalExpenses={0} monthTotalIncome={0} weekTotalIncome={0} />
    );
    wrapper.setState({ items: [] });
    expect(wrapper.type()).toEqual(null);
  });
  it('renders <InsightItem /> properly', () => {
    const wrapper = shallow(
      <InsightsItem value={100} byLine="Hello" />
    );
    expect(wrapper.type()).toEqual(React.Fragment);
  });
  it('renders empty <InsightItem /> when value is equal to 0', () => {
    const wrapper = shallow(
      <InsightsItem value={0} byLine="Hello" />
    );
    expect(wrapper.type()).toEqual(null);
  });
});