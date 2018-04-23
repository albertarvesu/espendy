import * as React from 'react';
import * as Currency from 'react-currency-formatter';
import * as moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { AppStateInterface, TransactionInterface, SettingsInterface } from '../../models';
import { selectAllTransactions, selectExpensesTransactions, selectIncomeTransactions } from './../../selectors/transactions';
import { selectUserSettings } from './../../selectors/settings';
import { deleteTransaction, DeleteTransactionInterface } from './../../actions/transactions';

import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

const ClipboardsIcon = require('./../../images/clipboards.svg');
// const PencilIcon = require('./../../images/edit.svg');
const TrashIcon = require('./../../images/garbage.svg');

interface TransactionsModalProps {
  transactions: Array<TransactionInterface>;
  expenses: Array<TransactionInterface>;
  incomes: Array<TransactionInterface>;
  settings: SettingsInterface;
  deleteTransaction: DeleteTransactionInterface;
}

interface TransactionsModalState {
  incomeChecked: boolean;
  expenseChecked: boolean;
}

export class TransactionsModal extends React.Component<TransactionsModalProps, TransactionsModalState> {
  constructor(props: TransactionsModalProps) {
    super(props);
    this.state = {
      incomeChecked: true,
      expenseChecked: true,
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(transaction: TransactionInterface) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.props.deleteTransaction(transaction);
    }
  }

  render () {
    const { transactions, incomes, expenses, settings } = this.props;
    let displayed: Array<TransactionInterface> = [];
    if (this.state.incomeChecked && this.state.expenseChecked) {
      displayed = transactions;
    } else if (this.state.incomeChecked) {
      displayed = incomes;
    } else if (this.state.expenseChecked) {
      displayed = expenses;
    }
    return (
      <div className="trans-wrap">
        <Link to="/home" className="close-button">
          x
        </Link>
        <div className="lists-wrap">
          <div className="header">
            <img className="icon" src={ClipboardsIcon} alt="Transactions" />
            <h5>Transactions</h5>
          </div>
          <div className="trans-filter">
            <label>Show</label>
            <input
              name="income"
              type="checkbox"
              checked={this.state.incomeChecked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ incomeChecked: event.target.checked });
              }}
            />
            <label> Income</label>
            <input
              name="expense"
              type="checkbox"
              checked={this.state.expenseChecked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ expenseChecked: event.target.checked });
              }}
            />
            <label> Expenses</label>
          </div>
          {displayed.length > 0 && (
            <table className="lists">
              <tbody>
                <tr>
                  <th className="td-date">Date</th>
                  <th className="td-category">Category</th>
                  <th className="td-remarks">Remarks</th>
                  <th className="td-amount">Amount</th>
                  <th className="td-actions">&nbsp;</th>
                </tr>
                {displayed.map(transaction => (
                  <tr key={transaction.id} className="tr-row">
                    <td className="td-date">{moment(transaction.date).format('MMDDYY')}</td>
                    <td className="td-category">
                      {transaction.type === 'expenses' ? (
                        <span className="category" title={EXPENSE_TYPES[transaction.category]}>
                          {transaction.category.toUpperCase()}
                        </span>
                      ) : (
                        <span className="category" title={INCOME_TYPES[transaction.category]}>
                          {transaction.category.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="td-remarks">
                      <span title={transaction.remarks}>{transaction.remarks}</span>
                    </td>
                    <td className="td-amount">
                      {`${transaction.type === 'expenses' ? '-' : ''}`}
                      <Currency quantity={transaction.amount} currency={settings.currency} />
                    </td>
                    <td>
                      {/* <Link
                        to={`transactions/${transaction.id}`}
                        className="action-button"
                        title="Edit Transaction"
                      >
                        <img src={PencilIcon} alt="Edit" className="action-icon edit" />
                      </Link> */}
                      <button
                        className="action-button"
                        title="Delete"
                        onClick={() => {
                          this.onDelete(transaction);
                        }}
                      >
                        <img src={TrashIcon} alt="Delete" className="action-icon edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {displayed.length === 0 && <span><i>No transaction to display.</i></span>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => {
  const settings: SettingsInterface = selectUserSettings(state);
  const from = settings.from ? moment(settings.from).startOf('day') : undefined;
  const to = settings.to ? moment(settings.to).endOf('day') : undefined;
  return {
    transactions: selectAllTransactions(state),
    expenses: selectExpensesTransactions(state, from, to),
    incomes: selectIncomeTransactions(state, from, to),
    settings,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    deleteTransaction,
  })
)(TransactionsModal);