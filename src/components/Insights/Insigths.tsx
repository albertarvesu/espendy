import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as moment from 'moment';
import * as Currency from 'react-currency-formatter';

import { AppStateInterface } from '../../models';

import {
  selectExpensesTransactions,
  selectIncomeTransactions,
} from './../../selectors/transactions';

interface InsightsItemProps {
  value: number;
  byLine: string;
}

export const InsightsItem = ({ value, byLine }: InsightsItemProps) => value > 0 ? (
  <React.Fragment>
    <div className="lead">
      <h2><Currency quantity={value} currency={'USD'} /></h2>
    </div>
    <div className="summary">
      <p>{byLine}</p>
    </div>
  </React.Fragment>
) : null;

interface InsightsProps {
  monthTotalExpenses: number;
  weekTotalExpenses: number;
  monthTotalIncome: number;
  weekTotalIncome: number;
}

interface InsightsState {
  items: Array<JSX.Element>;
  index: number;
  timerId: any;
}

const random = (max: number) => Math.floor(Math.random() * (max + 1));

export class Insights extends React.Component<InsightsProps, InsightsState> {
  constructor(props: InsightsProps) {
    super(props);
    this.state = {
      items: [],
      index: 0,
      timerId: null,
    };
  }

  componentDidMount() {
    const items =
      [
        <InsightsItem key={0} value={this.props.monthTotalExpenses} byLine={`Your total expenses for ${moment().format('MMMM YYYY')}`} />,
        <InsightsItem key={1} value={this.props.weekTotalExpenses} byLine="Your total expenses for this week" />,
        <InsightsItem key={2} value={this.props.monthTotalIncome} byLine={`Your total income for ${moment().format('MMMM YYYY')}`} />,
        <InsightsItem key={3} value={this.props.weekTotalIncome} byLine="Your total income for this week" />,
      ];

    if (items.length > 0) {
      const timerId = setInterval(() => this.setState({ index: random(items.length - 1) }), 10000);
      this.setState({
        items,
        index: random(items.length - 1),
        timerId,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render () {
    if (this.state.items.length > 0) {
      return this.state.items[this.state.index];
    } 
    return null;
  }
}

const mapStateToProps = (state: AppStateInterface) => {
  const endOfToday = moment().endOf('day');
  const monthExpenses = selectExpensesTransactions(state, moment().startOf('month').startOf('day'), endOfToday);
  const weekExpenses = selectExpensesTransactions(state, moment().startOf('week').startOf('day'), endOfToday);
  const monthIncome = selectIncomeTransactions(state, moment().startOf('month').startOf('day'), endOfToday);
  const weekIncome = selectIncomeTransactions(state, moment().startOf('week').startOf('day'), endOfToday);
  return {
    monthTotalExpenses: monthExpenses.reduce((acc: number , curr) => curr.amount + acc, 0),
    weekTotalExpenses: weekExpenses.reduce((acc: number , curr) => curr.amount + acc, 0),
    monthTotalIncome: monthIncome.reduce((acc: number , curr) => curr.amount + acc, 0),
    weekTotalIncome: weekIncome.reduce((acc: number , curr) => curr.amount + acc, 0),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Insights);