import * as React from 'react';
import * as Currency from 'react-currency-formatter';
import * as moment from 'moment';

import { TransactionInterface } from '../../reducers';

import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

import './Transactions.css';

const Clipboards = require('./../../images/clipboards.svg');

const MAX_DISPLAY = 9;

interface TransactionsProps {
  transactions: Array<TransactionInterface>;
  currency?: string;
}

export class Transactions extends React.Component<TransactionsProps> {
  render () {
    const { transactions } = this.props;
    return (
      <React.Fragment>
        <div className="lead">
          <div className="header">
            <img className="icon" src={Clipboards} alt="Transactions" />
            <h5>Transactions</h5>
          </div>
          <table className="lists">
            <tbody>
              <tr>
                <th className="td-date">Date</th>
                <th className="td-category">Category</th>
                <th className="td-remarks">Remarks</th>
                <th className="td-amount">Amount</th>
              </tr>
              {transactions.slice(0, MAX_DISPLAY).map(transaction => (
                <tr key={transaction.id} className="tr-row">
                  <td className="td-date">{moment(transaction.date).format('l')}</td>
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
                    <Currency quantity={transaction.amount} currency={this.props.currency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length > MAX_DISPLAY && (
          <div className="footer">
            <a href="/home" className="link">
              View All Transactions ({transactions.length})
            </a>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Transactions;