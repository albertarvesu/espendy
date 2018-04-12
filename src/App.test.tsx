import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './enzymeAdapter';
import { shallow } from 'enzyme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Testing <App />', () => {
  it('renders the <BrowserRouter> as the first element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual(BrowserRouter);
  });
  it('renders the <Switch /> correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Switch).length).toEqual(1);
  });
  it('renders only one <Route />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Route).length).toEqual(1);
  });
});
