import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEmpty } from 'lodash';

import Box from './../Box/Box';
import Balance from './../Balance/Balance';
import AddTransaction from './../AddTransaction/AddTransaction';

import { getTransactions, GetTransactionsInterface } from './../../actions/transactions';
import { AppStateInterface, UserInterface } from '../../reducers';
import { selectCurrentUser } from './../../selectors/user';
import { selectCurrentBalance } from './../../selectors/transactions';

import './Home.css';

interface HomeProps {
  currentUser: UserInterface;
  currentBalance: number;
  getTransactions: GetTransactionsInterface;
}

export class Home extends React.Component<HomeProps> {
  componentDidMount() {
    document.body.classList.remove('landing');
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    if (this.props.currentUser !== nextProps.currentUser && !isEmpty(nextProps.currentUser)) {
      this.props.getTransactions(nextProps.currentUser);
    }
  }
  
  render () {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="content">

            <Box type="lr" clazz="balance">
              <Balance amount={this.props.currentBalance} currency="SGD" />
            </Box>

            <Box
              path="/add-transaction"
              title="Add New Transaction"
              type="td"
              clazz="tile-link add-new hvr-bounce-to-left"
            >
              <AddTransaction />
            </Box>

          </div>
        </div>

        <div className="sidebar" />

      </div>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  currentUser: selectCurrentUser(state),
  currentBalance: selectCurrentBalance(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getTransactions
  })
)(Home);