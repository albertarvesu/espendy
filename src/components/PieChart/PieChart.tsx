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

const toPercent = (amount: number, total: number): number => Math.round((amount / total) * 100);

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
            name: `${EXPENSE_TYPES[curr]}  (${toPercent(rawData[curr], this.props.totalExpenses)}%)`,
            symbol: { fill: COLOR_SCALE[index] }
          }
        ];
      },
      []
    );
    return (
      <React.Fragment>
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
        <VictoryLegend
          width={500}
          height={125}
          orientation="vertical"
          gutter={150}
          standalone={true}
          data={legendData}
          style={{
            labels: { fill: 'white', fontSize: 12 }
          }}
        />
      </React.Fragment>
    );
  }
}

export default PieChart;