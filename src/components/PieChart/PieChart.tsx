import * as React from 'react';
import { get } from 'lodash';
import { VictoryPie } from 'victory';
import { TransactionInterface } from '../../models';

import './PieChart.css';

interface PieChartProps {
  expenses: Array<TransactionInterface>;
  totalExpenses: number;
}

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
    return (
      <React.Fragment>
        <div className="legend">Expenses Allocation</div>
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
          colorScale={[
            '#a4c400',
            '#1ba1e2',
            '#f472d0',
            '#825a2c',
            '#76608a',
            '#795548',
          ]}
          labelRadius={90}
          labels={(d) => `${d.x} ${Math.round(d.y)}%`}
          data={expenses}
          style={{
            data: { stroke: 'white', strokeWidth: 1 },
            labels: { fill: 'white', fontSize: 10 }
          }}
        />
      </React.Fragment>
    );
  }
}

export default PieChart;