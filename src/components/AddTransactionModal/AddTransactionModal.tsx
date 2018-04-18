import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import  { db } from './../../firebase';

import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

import { TransactionInterface } from './../../reducers';
import { createTransaction, CreateTransactionInterface } from './../../actions/transactions';

import 'react-datepicker/dist/react-datepicker.css';
import './AddTransactionModal.css';

interface CategoryProps {
  className?: string;
  autoFocus?: boolean;
  types: object;
  onChange: any;
}

export const CategoryTypes = ({ className, autoFocus, types, onChange }: CategoryProps) => (
  <select autoFocus={autoFocus} className={className} onChange={onChange}>
    {Object.keys(types).map(key => (
      <option value={key} key={key}>
        {types[key]}
      </option>
    ))}
  </select>
);

interface ModalProps {
  createTransaction: CreateTransactionInterface;
  history?: any;
}

interface ModalState {
  hasError: boolean;
  errorMessage: string;
  type: string;
  date: moment.Moment;
  category: string;
  amount: string;
  remarks: string;
}

export class AddTransactionModal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      type: 'expenses',
      date: moment(),
      category: Object.keys(EXPENSE_TYPES)[0],
      amount: '',
      remarks: ''
    };
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeRemarks = this.onChangeRemarks.bind(this);
    this.onSaveTransaction = this.onSaveTransaction.bind(this);
  }

  onChangeType(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ type: event.target.value }, () => {
      const categoryTypes =
        this.state.type === 'expenses' ? EXPENSE_TYPES : INCOME_TYPES;
      this.setState({ category: Object.keys(categoryTypes)[0] });
    });
  }

  onChangeDate(date: moment.Moment) {
    this.setState({ date });
  }

  onChangeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ category: event.target.value });
  }

  onChangeAmount(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ amount: event.target.value });
  }

  onChangeRemarks(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ remarks: event.target.value });
  }

  onSaveTransaction() {
    if (!this.state.amount) {
      this.setState({
        hasError: true,
        errorMessage: 'Amount is a required field.'
      });
      return;
    }

    const key = db.ref().child('transactions').push().key;
    const transaction: TransactionInterface = {
      id: key || undefined,
      type: this.state.type,
      category: this.state.category,
      date: this.state.date.toDate(),
      amount: parseFloat(this.state.amount),
      remarks: this.state.remarks,
    };
    this.props.createTransaction(transaction, '/home', this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/home" className="close-button">
          x
        </Link>
        {this.state.hasError && <div className="error">{this.state.errorMessage}</div>}
        <h4>Type</h4>
        <select onChange={this.onChangeType}>
          <option value="expenses">Expenses</option>
          <option value="income">Income</option>
        </select>
        <h4>Category</h4>
        {this.state.type === 'expenses' && (
          <CategoryTypes
            autoFocus={true}
            className="expense-types"
            types={EXPENSE_TYPES}
            onChange={this.onChangeCategory}
          />
        )}
        {this.state.type === 'income' && (
          <CategoryTypes
            autoFocus={false}
            className="income-types"
            types={INCOME_TYPES}
            onChange={this.onChangeCategory}
          />
        )}
        <h4>Date</h4>
        <DatePicker
          dateFormat="MMM DD, YYYY"
          selected={this.state.date}
          maxDate={moment()}
          className="modal-input"
          onChange={this.onChangeDate}
          readOnly={true}
        />
        <h4>Amount</h4>
        <input
          type="number"
          placeholder="e.g. 100.00"
          className="modal-input"
          value={this.state.amount}
          onChange={this.onChangeAmount}
        />
        <h4>Remarks</h4>
        <textarea
          className="modal-input-textarea"
          placeholder="Remarks"
          value={this.state.remarks}
          onChange={this.onChangeRemarks}
        />
        <div className="actions right">
          <button className="button primary" onClick={this.onSaveTransaction}>
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(null, {
    createTransaction
  })
)(AddTransactionModal);