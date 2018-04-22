import * as React from 'react';
import { get } from 'lodash';
import { VictoryPie, VictoryLegend } from 'victory';
import { TransactionInterface } from '../../models';
import EXPENSE_TYPES from './../../constants/expenseTypes';
import './PieChart.css';

interface PieChartProps {
  expenses: Array<TransactionInterface>;
  totalExpenses: number;
}

const COLOR_SCALE = [
  '#a4c400',
  '#1ba1e2',
  '#f472d0',
  '#825a2c',
  '#76608a',
  '#795548',
];

const toPercent = (amount: number, total: number): number => ((amount / total) * 100);

class PieChart extends React.Component<PieChartProps> {
  render () {
    const rawData = this.props.expenses.reduce(
      (acc, curr) => ({
          ...acc,
          [curr.category]: get(acc, curr.category, 0) + curr.amount,
        }),
      {}
    );
    const expenses = Object.keys(rawData).map(code => ({
      y: toPercent(rawData[code], this.props.totalExpenses),
      x: code.toUpperCase(),
    }));
    const legendData = Object.keys(rawData).reduce(
      (acc, curr, index) => {
        return [
          ...acc,
          {
            name: EXPENSE_TYPES[curr],
            symbol: { fill: COLOR_SCALE[index] }
          }
        ];
      },
      []
    );
    return (
      <React.Fragment>
        <VictoryLegend
          width={750}
          height={20}
          orientation="horizontal"
          gutter={50}
          standalone={true}
          data={legendData}
        />
        <VictoryPie
          animate={{
            duration: 1000,
            onLoad: {
              duration: 1000,
              before: () => ({ opacity: 0.3, _y: 0 }),
              after: datum => ({ opacity: 1, _y: datum._y })
            }
          }}
          innerRadius={60}
          colorScale={COLOR_SCALE}
          labelRadius={90}
          labels={(d) => `${Math.round(d.y)}%`}
          data={expenses}
          style={{
            data: { stroke: 'white', strokeWidth: 1 },
            labels: { fill: 'white', fontSize: 8 }
          }}
        />
        <div className="legend">Expenses Allocation</div>
      </React.Fragment>
    );
  }
}

export default PieChart;