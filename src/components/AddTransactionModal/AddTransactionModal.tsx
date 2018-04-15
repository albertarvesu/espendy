import * as React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import EXPENSE_TYPES from './../../constants/expenseTypes';
import INCOME_TYPES from './../../constants/incomeTypes';

import 'react-datepicker/dist/react-datepicker.css';
import './AddTransactionModal.css';

interface CategoryProps {
  className?: string;
  types: object;
  onChange: any;
}

export const CategoryTypes = ({ className, types, onChange }: CategoryProps) => (
  <select className={className} onChange={onChange}>
    {Object.keys(types).map(key => (
      <option value={key} key={key}>
        {types[key]}
      </option>
    ))}
  </select>
);

interface ModalProps {

}

interface ModalState {
  type: string;
  date: moment.Moment;
  category: string;
  amount: number;
  remarks: string;
}

class AddTransactionModal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      type: 'expenses',
      date: moment(),
      category: Object.keys(EXPENSE_TYPES)[0],
      amount: 0,
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
    this.setState({ amount: parseFloat(event.target.value) });
  }

  onChangeRemarks(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ remarks: event.target.value });
  }

  onSaveTransaction() {
    console.warn(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/home" className="close-button">
          x
        </Link>
        <h4>Type</h4>
        <select onChange={this.onChangeType}>
          <option value="expenses">Expenses</option>
          <option value="income">Income</option>
        </select>
        <h4>Category</h4>
        {this.state.type === 'expenses' && (
          <CategoryTypes
            className="expense-types"
            types={EXPENSE_TYPES}
            onChange={this.onChangeCategory}
          />
        )}
        {this.state.type === 'income' && (
          <CategoryTypes
            className="income-types"
            types={INCOME_TYPES}
            onChange={this.onChangeCategory}
          />
        )}
        <h4>Date</h4>
        <DatePicker
          dateFormat="MMM DD, YYYY"
          selected={this.state.date}
          className="modal-input"
          onChange={this.onChangeDate}
        />
        <h4>Amount</h4>
        <input
          type="number"
          placeholder="100.00"
          className="modal-input"
          value={this.state.amount}
          onChange={this.onChangeAmount}
        />
        <h4>Remarks</h4>
        <textarea
          className="modal-input-textarea"
          placeholder="Remarks"
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

export default AddTransactionModal;
