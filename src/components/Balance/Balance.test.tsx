import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import Balance from './Balance';

describe('Testing <Balance />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(<Balance amount={10} />);
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find('.label h5').text()).toEqual('Balance');
  });
});