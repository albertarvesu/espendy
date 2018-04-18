import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { AddTransactionModal, CategoryTypes } from './AddTransactionModal';
import { Link } from 'react-router-dom';

describe('Testing <AddTransactionModal />', () => {
  it('renders the skeletons of element', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.type()).toEqual(React.Fragment);
  });
  it('renders the close button', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.find(Link).props().to).toEqual('/home');
    expect(wrapper.find(Link).hasClass('close-button')).toEqual(true);
  });
  it('renders correct transaction type <select />', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.find(CategoryTypes).props().className).toEqual('expense-types');
    wrapper.setState({ type: 'income' });
    expect(wrapper.find(CategoryTypes).props().className).toEqual('income-types');
  });
  it('renders correct amount', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.find('input.modal-input').props().value).toEqual('');
    wrapper.setState({ amount: '1000' });
    expect(wrapper.find('input.modal-input').props().value).toEqual('1000');
  });
  it('renders correct remarks', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.find('textarea.modal-input-textarea').props().value).toEqual('');
    wrapper.setState({ remarks: 'remarks' });
    expect(wrapper.find('textarea.modal-input-textarea').props().value).toEqual('remarks');
  });
  it('renders error when no amount entered', () => {
    // tslint:disable-next-line:no-empty
    const wrapper = shallow(<AddTransactionModal createTransaction={() => {}} />);
    expect(wrapper.find('.error').length).toEqual(0);
    wrapper.setState({ hasError: true, errorMessage: 'Error' });
    expect(wrapper.find('.error').length).toEqual(1);
    expect(wrapper.find('.error').text()).toEqual('Error');
  });
});