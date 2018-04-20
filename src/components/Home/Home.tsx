import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as moment from 'moment';
import { isEmpty, debounce } from 'lodash';

import Box from './../Box/Box';
import Balance from './../Balance/Balance';
import AddTransaction from './../AddTransaction/AddTransaction';
import Transactions from './../Transactions/Transactions';
import LineChart from './../LineChart/LineChart';
import PieChart from './../PieChart/PieChart';

import { getTransactions, GetTransactionsInterface } from './../../actions/transactions';
import { AppStateInterface, UserInterface, TransactionInterface, SettingsInterface } from '../../models';
import { selectCurrentUser } from './../../selectors/user';
import { selectUserSettings } from './../../selectors/settings';
import {
  selectAllTransactions,
  selectCurrentBalance,
  selectExpensesTransactions,
  selectTotalExpenses,
  selectExpensesTransactionsByDate,
  selectIncomeTransactionsByDate,
} from './../../selectors/transactions';

import './Home.css';

const MAX_DOCUMENT_WIDTH = 700;

const SettingsIcon = require('./../../images/settings.svg');
const SignoutIcon = require('./../../images/power-button.svg');

interface HomeProps {
  currentUser: UserInterface;
  currentBalance: number;
  settings: SettingsInterface;
  getTransactions: GetTransactionsInterface;
  transactions: Array<TransactionInterface>;
  expenses: Array<TransactionInterface>;
  totalExpenses: number;
  expensesByDate: object;
  incomesByDate: object;
}

export class Home extends React.Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
    this.onScroll = debounce(this.onScroll.bind(this), 10);
  }
  componentDidMount() {
    document.body.classList.remove('landing');
    window.addEventListener('scroll', this.onScroll);
    this.props.getTransactions(this.props.currentUser);
  }

  componentWillReceiveProps(nextProps: HomeProps) {
    if (
      (this.props.currentUser !== nextProps.currentUser && !isEmpty(nextProps.currentUser)) ||
      this.props.settings !== nextProps.settings
    ) {
      this.props.getTransactions(nextProps.currentUser);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      if (document.documentElement.clientWidth > MAX_DOCUMENT_WIDTH) {
        sidebar.style.marginTop = `${document.documentElement.scrollTop}px`;
      } else {
        sidebar.style.marginTop = `0px`;
      }
    }
  }
  
  render () {
    const { currentUser } = this.props;
    return (
      <div className="wrapper">
        <div className="container">
          <div className="content">

            <Box type="lr" clazz="balance">
              <Balance amount={this.props.currentBalance} currency={this.props.settings.currency} />
            </Box>

            <Box
              path="/add-transaction"
              title="Add New Transaction"
              type="td"
              clazz="tile-link add-new hvr-bounce-to-left"
            >
              <AddTransaction />
            </Box>

            {(!isEmpty(this.props.expensesByDate) || !isEmpty(this.props.incomesByDate)) && (
              <Box clazz="chart line">
                <LineChart
                  expensesByDate={this.props.expensesByDate}
                  incomesByDate={this.props.incomesByDate}
                />
              </Box>
            )}

            {!isEmpty(this.props.expenses) && (
              <Box clazz="chart pie">
                <PieChart
                  totalExpenses={this.props.totalExpenses}
                  expenses={this.props.expenses}
                />
              </Box>
            )}

            {!isEmpty(this.props.transactions) && (
              <Box clazz="transactions tile-link">
                <Transactions transactions={this.props.transactions} currency={this.props.settings.currency} />
              </Box>
            )}

            <Link
              className="box box-td tile-link settings hvr-bounce-to-left"
              to="/home/settings"
            >
              <div className="lead">
                <img alt="Settings" className="icon" src={SettingsIcon} />
              </div>
              <div className="summary">
                <p>Settings</p>
              </div>
            </Link>

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

          <div className="sidebar" id="sidebar">
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

const mapStateToProps = (state: AppStateInterface) => {
  const settings: SettingsInterface = selectUserSettings(state);
  const from = settings.from ? moment(settings.from) : undefined;
  const to = settings.to ? moment(settings.to) : undefined;
  return {
    currentUser: selectCurrentUser(state),
    settings,
    currentBalance: selectCurrentBalance(state),
    transactions: selectAllTransactions(state),
    expenses: selectExpensesTransactions(state),
    totalExpenses: selectTotalExpenses(state),
    expensesByDate: selectExpensesTransactionsByDate(state, undefined, from, to),
    incomesByDate: selectIncomeTransactionsByDate(state, undefined, from, to),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getTransactions
  })
)(Home);