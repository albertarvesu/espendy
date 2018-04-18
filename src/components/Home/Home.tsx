import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEmpty } from 'lodash';

import Box from './../Box/Box';
import Balance from './../Balance/Balance';
import AddTransaction from './../AddTransaction/AddTransaction';
import Transactions from './../Transactions/Transactions';
import LineChart from './../LineChart/LineChart';

import { getTransactions, GetTransactionsInterface } from './../../actions/transactions';
import { AppStateInterface, UserInterface, TransactionInterface } from '../../reducers';
import { selectCurrentUser } from './../../selectors/user';
import {
  selectAllTransactions,
  selectCurrentBalance,
  selectExpensesTransactionsByDate,
  selectIncomeTransactionsByDate,
} from './../../selectors/transactions';

import './Home.css';

const SignoutIcon = require('./../../images/power-button.svg');

interface HomeProps {
  currentUser: UserInterface;
  currentBalance: number;
  getTransactions: GetTransactionsInterface;
  transactions: Array<TransactionInterface>;
  expensesByDate: object;
  incomesByDate: object;
}

export class Home extends React.Component<HomeProps> {
  componentDidMount() {
    document.body.classList.remove('landing');
    this.props.getTransactions(this.props.currentUser);
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    if (this.props.currentUser !== nextProps.currentUser && !isEmpty(nextProps.currentUser)) {
      this.props.getTransactions(nextProps.currentUser);
    }
  }
  
  render () {
    const { currentUser } = this.props;
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

            {!isEmpty(this.props.expensesByDate) && !isEmpty(this.props.incomesByDate) && (
              <Box clazz="chart line">
                <LineChart
                  expensesByDate={this.props.expensesByDate}
                  incomesByDate={this.props.incomesByDate}
                />
              </Box>
            )}

            {!isEmpty(this.props.transactions) && (
              <Box clazz="transactions tile-link">
                <Transactions transactions={this.props.transactions} />
              </Box>
            )}

            <Link
              className="box box-td tile-link sign-out hvr-bounce-to-left"
              to="/signout"
            >
              <div className="lead">
                <img alt="Signout" className="icon" src={SignoutIcon} />
              </div>
              <div className="summary">
                <p>Sign Out</p>
              </div>
            </Link>
          </div>

          <div className="sidebar">
            <div className="profile">
              <img
                alt={`${currentUser.displayName}`}
                className="avatar"
                src={currentUser.photoURL}
              />
              <div className="text">
                <h5>{currentUser.displayName}</h5>
                <span>{currentUser.email}</span>
              </div>
            </div>
            <div className="sidebox ads" />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  currentUser: selectCurrentUser(state),
  currentBalance: selectCurrentBalance(state),
  transactions: selectAllTransactions(state),
  expensesByDate: selectExpensesTransactionsByDate(state),
  incomesByDate: selectIncomeTransactionsByDate(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getTransactions
  })
)(Home);