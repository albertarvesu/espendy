import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import AddTransactionModal, { CategoryTypes } from './AddTransactionModal';
import { Link } from 'react-router-dom';

describe('Testing <AddTransactionModal />', () => {
  it('renders the skeletons of element', () => {
    const wrapper = shallow(<AddTransactionModal />);
    expect(wrapper.type()).toEqual(React.Fragment);
  });
  it('renders the close button', () => {
    const wrapper = shallow(<AddTransactionModal />);
    expect(wrapper.find(Link).props().to).toEqual('/home');
    expect(wrapper.find(Link).hasClass('close-button')).toEqual(true);
  });
  it('renders correct transaction type <select />', () => {
    const wrapper = shallow(<AddTransactionModal />);
    expect(wrapper.find(CategoryTypes).props().className).toEqual('expense-types');
    wrapper.setState({ type: 'income' });
    expect(wrapper.find(CategoryTypes).props().className).toEqual('income-types');
  });
});