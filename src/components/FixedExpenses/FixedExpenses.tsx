import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Currency from 'react-currency-formatter';

import { AppStateInterface, TransactionInterface, SettingsInterface } from '../../models';
import { selectFixedExpenses } from '../../selectors/transactions';

import EXPENSE_TYPES from './../../constants/expenseTypes';

import './FixedExpenses.css';

const PinIcon = require('./../../images/pin.svg');

interface FixedExpensesProps {
  settings: SettingsInterface;
  fixedExpenses: Array<TransactionInterface>;
}

export class FixedExpenses extends React.Component<FixedExpensesProps> {
  render () {
    return (
      <React.Fragment>
        <div className="lead">
          <div className="header">
            <img className="icon" src={PinIcon} alt="Fixed Expenses" />
            <h5>Fixed Expenses</h5>
          </div>
          {this.props.fixedExpenses.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Schedule</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.props.fixedExpenses.map(fixed => (
                  <tr key={fixed.id}>
                    <td>{EXPENSE_TYPES[fixed.category]}</td>
                    <td className="capitalize">{fixed.schedule}</td>
                    <td><Currency quantity={fixed.amount} currency={this.props.settings.currency} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {this.props.fixedExpenses.length === 0 && (
            <span className="nofixed"><i>No fixed expenses to display.</i></span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  fixedExpenses: selectFixedExpenses(state)
});

export default compose(
  connect(mapStateToProps),
)(FixedExpenses);