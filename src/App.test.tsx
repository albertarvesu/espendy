import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './enzymeAdapter';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';

describe('Testing <App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  it('renders the <Provider> as the first element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual(Provider);
  });
});
