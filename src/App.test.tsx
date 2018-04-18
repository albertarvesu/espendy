import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './enzymeAdapter';
import { shallow } from 'enzyme';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Testing <App />', () => {
  it('renders the <Provider> as the first element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual(Provider);
  });
  it('renders the <Switch /> correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Switch).length).toEqual(1);
  });
  it('renders 3 <Route />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Route).length).toEqual(3);
  });
});
