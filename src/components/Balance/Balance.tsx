import * as React from 'react';
// import { connect } from 'react-redux';
import * as Currency from 'react-currency-formatter';

const CurrencyIcon = require('./../../images/currency.svg');

interface BalanceProps {
  amount: number;
  currency?: string;
}

const Balance = ({ amount, currency }: BalanceProps) => (
  <React.Fragment>
    <div className="label">
      <img alt="Currency" className="icon" src={CurrencyIcon} />
      <h5>Balance</h5>
    </div>
    <div className="lead">
      <h2>
        <Currency quantity={amount} currency={currency} />
      </h2>
    </div>
  </React.Fragment>
);

export default Balance;
