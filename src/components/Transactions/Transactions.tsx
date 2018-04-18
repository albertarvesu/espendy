import * as React from 'react';
import * as Currency from 'react-currency-formatter';
import * as moment from 'moment';

import { TransactionInterface } from '../../reducers';

import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

import './Transactions.css';

const Clipboards = require('./../../images/clipboards.svg');

const MAX_DISPLAY = 7;

interface TransactionsProps {
  transactions: Array<TransactionInterface>;
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
                <th>Date/Time</th>
                <th>Category</th>
                <th>Remarks</th>
                <th>Amount</th>
              </tr>
              {transactions.slice(0, MAX_DISPLAY).map(transaction => (
                <tr key={transaction.id}>
                  <td>{moment(transaction.date).format('l')}</td>
                  <td>
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
                  <td>{transaction.remarks}</td>
                  <td>{`${transaction.type === 'expenses' ? '-' : ''}`}<Currency quantity={transaction.amount} /></td>
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