import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import AddTransaction from './AddTransaction';

describe('Testing <AddTransaction />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(<AddTransaction />);
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find('.lead').length).toEqual(1);
    expect(wrapper.find('.lead img').props().alt).toEqual('Add Transaction');
    expect(wrapper.find('.summary').length).toEqual(1);
    expect(wrapper.find('.summary p').text()).toEqual('Add Transaction');
  });
});