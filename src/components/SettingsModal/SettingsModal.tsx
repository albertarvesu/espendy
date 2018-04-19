import * as React from 'react';
import * as moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SelectCurrency from 'react-select-currency';
import DatePicker from 'react-datepicker';
import { selectCurrentUser } from './../../selectors/user';
import { selectUserSettings } from './../../selectors/settings';
import { updateSettings, UpdateSettingsInterface } from './../../actions/settings';
import { AppStateInterface, SettingsInterface } from './../../reducers';

interface SettingsProps {
  settings: SettingsInterface;
  updateSettings?: UpdateSettingsInterface;
  history: any;
}

interface SettingsState {
  from: moment.Moment;
  to: moment.Moment;
  roundingValue: number;
  currency: string;
}

export class SettingsModal extends React.Component<SettingsProps, SettingsState> {

  static defaultProps: SettingsProps = {
    history: null,
    settings: {
      from: moment().startOf('month').toDate(),
      to: moment().endOf('day').toDate(),
      roundingValue: 0,
      currency: 'USD',
    } as SettingsInterface
  };

  constructor(props: SettingsProps) {
    super(props);
    this.state = {
      from: moment(props.settings.from),
      to: moment(props.settings.to),
      roundingValue: props.settings.roundingValue,
      currency: props.settings.currency,
    };
    this.onUpdate = this.onUpdate.bind(this);
  }
  
  onUpdate() {
    const currentSettings: SettingsInterface = {
      from: this.state.from.toDate(),
      to: this.state.to.toDate(),
      currency: this.state.currency,
      roundingValue: this.state.roundingValue,
    };

    if (this.props.updateSettings) {
      this.props.updateSettings(
        currentSettings,
        '/home',
        this.props.history,
      );
    }
  }

  render () {
    return (
      <React.Fragment>
        <Link to="/home" className="close-button">
          x
        </Link>
        <h4>From</h4>
        <DatePicker
          id="dateFrom"
          name="dateFrom"
          dateFormat="MMM DD, YYYY"
          selected={this.state.from}
          maxDate={moment(this.state.to).clone().subtract(7, 'days')}
          className="modal-input"
          readOnly={true}
          // tslint:disable-next-line:no-empty
          onChange={(date: moment.Moment) => {
            this.setState({ from: date });
          }}
        />
        <h4>To</h4>
        <DatePicker
          id="dateTo"
          name="dateTo"
          dateFormat="MMM DD, YYYY"
          selected={this.state.to}
          minDate={moment(this.state.from).clone().add(7, 'days')}
          maxDate={moment()}
          className="modal-input"
          readOnly={true}
          // tslint:disable-next-line:no-empty
          onChange={(date: moment.Moment) => {
            this.setState({ to: date, from: moment(date).clone().subtract(7, 'days') });
          }}
        />
        <h4>Currency</h4>
        <SelectCurrency
          value={this.state.currency}
          name="currency"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            this.setState({ currency: event.target.value });
          }}
        />
        <h4>Rounding Value</h4>
        <input
          type="number"
          name="roundingValue"
          placeholder="100.00"
          className="modal-input"
          value={this.state.roundingValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ roundingValue: parseInt(event.target.value, 10) });
          }}
        />
        <div className="actions right">
          <button className="button primary" onClick={this.onUpdate}>
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppStateInterface) => ({
  currentUser: selectCurrentUser(state),
  settings: selectUserSettings(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    updateSettings
  })
)(SettingsModal);