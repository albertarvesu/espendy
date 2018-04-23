import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as moment from 'moment';
import * as Currency from 'react-currency-formatter';

import { AppStateInterface, SettingsInterface } from '../../models';

import {
  selectExpensesTransactions,
  selectIncomeTransactions,
} from './../../selectors/transactions';

interface InsightsItemProps {
  value: number;
  currency: string;
  byLine: string;
}

const INTERVAL = 5000;

export const InsightsItem = ({ value, currency, byLine }: InsightsItemProps) => value > 0 ? (
  <React.Fragment>
    <div className="lead">
      <h2><Currency quantity={value} currency={currency} /></h2>
    </div>
    <div className="summary">
      <p>{byLine}</p>
    </div>
  </React.Fragment>
) : null;

interface InsightsProps {
  settings: SettingsInterface;
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

  componentWillReceiveProps(nextProps: InsightsProps) {
    if (this.props.settings !== nextProps.settings) {
      this.setInsightItems(nextProps.settings);
    }
  }

  componentDidMount() {
    this.setInsightItems(this.props.settings);
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  setInsightItems(settings: SettingsInterface) {
    clearInterval(this.state.timerId);
    const items = [
      <InsightsItem key={0} value={this.props.monthTotalExpenses} currency={settings.currency} byLine={`Your total expenses for ${moment().format('MMMM YYYY')}`} />,
      <InsightsItem key={1} value={this.props.weekTotalExpenses} currency={settings.currency} byLine="Your total expenses for this week" />,
      <InsightsItem key={2} value={this.props.monthTotalIncome} currency={settings.currency} byLine={`Your total income for ${moment().format('MMMM YYYY')}`} />,
      <InsightsItem key={3} value={this.props.weekTotalIncome} currency={settings.currency} byLine="Your total income for this week" />,
    ];

    if (items.length > 0) {
      const timerId = setInterval(() => this.setState({ index: random(items.length - 1) }), INTERVAL);
      this.setState({
        items,
        index: random(items.length - 1),
        timerId,
      });
    }
  }

  render () {
    if (this.state.items.length > 0) {
      return this.state.items[this.state.index];
    } 
    return null;
  }
}

const mapStateToProps = (state: AppStateInterface, ownProps: any) => {
  const endOfToday = moment().endOf('day');
  const monthExpenses = selectExpensesTransactions(state, moment().startOf('month').startOf('day'), endOfToday);
  const weekExpenses = selectExpensesTransactions(state, moment().startOf('week').startOf('day'), endOfToday);
  const monthIncome = selectIncomeTransactions(state, moment().startOf('month').startOf('day'), endOfToday);
  const weekIncome = selectIncomeTransactions(state, moment().startOf('week').startOf('day'), endOfToday);
  return {
    settings: ownProps.settings,
    monthTotalExpenses: monthExpenses.reduce((acc: number , curr) => curr.amount + acc, 0),
    weekTotalExpenses: weekExpenses.reduce((acc: number , curr) => curr.amount + acc, 0),
    monthTotalIncome: monthIncome.reduce((acc: number , curr) => curr.amount + acc, 0),
    weekTotalIncome: weekIncome.reduce((acc: number , curr) => curr.amount + acc, 0),
  };
};

export default compose(
  connect(mapStateToProps)
)(Insights);