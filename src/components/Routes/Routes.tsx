import * as React from 'react';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';

import Landing from './../Landing/Landing';
import Home from './../Home/Home';
import SignOut from './../SignOut/SignOut';
import AddTransactionModal from './../AddTransactionModal/AddTransactionModal';
import SettingsModal from './../SettingsModal/SettingsModal';
import TransactionsModal from './../TransactionsModal/TransactionsModal';

import { AppStateInterface, AuthStateInterface } from '../../models';

import { selectAuth } from '../../selectors/auth';

interface HomeRouteProps {
  component: React.ComponentClass;
  isAuthenticated: boolean;
  path: string;
}

export const HomeRoute = ({ component: Component, isAuthenticated, ...rest }: HomeRouteProps) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/" push={true} />
    }
  />
);

interface RoutesProps {
  currentAuth: AuthStateInterface;
}

export class Routes extends React.Component<RoutesProps> {
  render () {
    const { currentAuth } = this.props;
    const isAuthenticated = !isEmpty(currentAuth.accessToken);
    return (
      <React.Fragment>
        <ModalRoute
          component={SettingsModal}
          path="/home/settings"
          className="modal-content settings"
        />
        <ModalRoute
          component={AddTransactionModal}
          path="/home/add-transaction"
          className="modal-content add-new"
        />
        <ModalRoute
          component={TransactionsModal}
          path="/home/transactions"
          className="modal-content transactions modal"
        />
        <ModalContainer containerClassName="modal-container" />
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <HomeRoute path="/home/:modal?" isAuthenticated={isAuthenticated} component={Home} />
          <Route path="/signout" component={SignOut} />
          <Redirect to="/" push={true} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  currentAuth: selectAuth(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Routes);