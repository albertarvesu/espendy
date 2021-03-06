import * as React from 'react';
import * as moment from 'moment';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLegend } from 'victory';
import { SettingsInterface } from './../../models';

const DATE_FORMAT = 'MMM DD, YYYY';

const toXY = (byDate: object) =>  Object.keys(byDate).reduce(
  (accum, curr) => {
    return [
      ...accum,
      {
        x: curr,
        y: byDate[curr],
      }
    ];
  },
  []
);

interface LineChartProps {
  settings: SettingsInterface;
  expensesByDate: object;
  incomesByDate: object;
}

class LineChart extends React.Component<LineChartProps> {
  render () {
    const { expensesByDate, incomesByDate, settings } = this.props;
    const expenses = toXY(expensesByDate);
    const incomes = toXY(incomesByDate);
    return (
      <React.Fragment>
        <VictoryChart>
          <VictoryLegend
            x={125}
            y={50}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: 'Expenses', symbol: { fill: '#FF9800' } },
              { name: 'Income', symbol: { fill: '#3F51B5' } },
            ]}
            style={{
              labels: { fill: 'white', fontSize: 12 }
            }}
          />
          <VictoryAxis
            label={`${moment(settings.from).format(DATE_FORMAT)} - ${moment(settings.to).format(DATE_FORMAT)}`}
            style={{
              axis: { stroke: 'white' },
              axisLabel: {
                fontSize: 10,
                padding: 30,
                fill: 'white',
                opacity: 0.8
              },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: {
                fontSize: 6,
                padding: 5,
                fill: 'white',
                opacity: 0.8
              }
            }}
          />
          <VictoryAxis
            dependentAxis={true}
            label="Transactions"
            style={{
              axis: { stroke: 'white' },
              axisLabel: {
                fontSize: 10,
                padding: 42,
                fill: 'white',
                opacity: 0.8,
              },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: {
                fontSize: 10,
                padding: 5,
                fill: 'white',
                opacity: 0.8
              }
            }}
          />
          <VictoryLine
            animate={{
              duration: 1000,
              onLoad: {
                duration: 1000,
                before: () => ({ opacity: 0.3, _y: 0 }),
                after: datum => ({ opacity: 1, _y: datum._y })
              }
            }}
            style={{
              data: { stroke: '#FF9800', strokeWidth: 2 }
            }}
            data={expenses}
          />
          <VictoryLine
            animate={{
              duration: 1000,
              onLoad: {
                duration: 1000,
                before: () => ({ opacity: 0.3, _y: 0 }),
                after: datum => ({ opacity: 1, _y: datum._y })
              }
            }}
            style={{
              data: { stroke: '#3F51B5', strokeWidth: 2 }
            }}
            data={incomes}
          />
        </VictoryChart>
      </React.Fragment>
    );
  }
}

export default LineChart;