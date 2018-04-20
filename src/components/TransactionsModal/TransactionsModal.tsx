import * as React from 'react';
import * as Currency from 'react-currency-formatter';
import * as moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { AppStateInterface, TransactionInterface, SettingsInterface } from '../../models';
import { selectAllTransactions } from './../../selectors/transactions';
import { selectUserSettings } from './../../selectors/settings';
import { deleteTransaction, DeleteTransactionInterface } from './../../actions/transactions';

import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

const ClipboardsIcon = require('./../../images/clipboards.svg');
const PencilIcon = require('./../../images/edit.svg');
const TrashIcon = require('./../../images/garbage.svg');

interface TransactionsModalProps {
  transactions: Array<TransactionInterface>;
  settings: SettingsInterface;
  deleteTransaction: DeleteTransactionInterface;
}

export class TransactionsModal extends React.Component<TransactionsModalProps> {
  constructor(props: TransactionsModalProps) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(transaction: TransactionInterface) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.props.deleteTransaction(transaction);
    }
  }

  render () {
    const { transactions, settings } = this.props;
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
          <table className="lists">
            <tbody>
              <tr>
                <th className="td-date">Date</th>
                <th className="td-category">Category</th>
                <th className="td-remarks">Remarks</th>
                <th className="td-amount">Amount</th>
                <th className="td-actions">&nbsp;</th>
              </tr>
              {transactions.map(transaction => (
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
                    <Link
                      to={`transactions/${transaction.id}`}
                      className="action-button"
                      title="Edit Transaction"
                    >
                      <img src={PencilIcon} alt="Edit" className="action-icon edit" />
                    </Link>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  transactions: selectAllTransactions(state),
  settings: selectUserSettings(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    deleteTransaction,
  })
)(TransactionsModal);