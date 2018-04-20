import * as React from 'react';
import './../../enzymeAdapter';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';
import { Home } from './../Home/Home';
import { AuthStateInterface } from '../../models';
import { Routes, HomeRoute } from './Routes';

describe('Testing <App />', () => {
  it('renders the component', () => {
    const auth: AuthStateInterface = {
      hasError: false,
      isLoggedIn: false,
      isLoggingIn: false,
      accessToken: ''
    };
    const wrapper = shallow(<Routes currentAuth={auth} />);
    expect(wrapper.type()).toEqual(React.Fragment);
    expect(wrapper.find(HomeRoute).length).toEqual(1);
    expect(wrapper.find(ModalRoute).length).toEqual(3);
    expect(wrapper.find(Route).length).toEqual(2);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
  it('render <Route />', () => {
    const wrapper = shallow(
      <HomeRoute path="/home" isAuthenticated={true} component={Home} />
    );
    expect(wrapper.type()).toEqual(Route);
  });
});