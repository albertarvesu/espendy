import * as React from 'react';

const AddIcon = require('./../../images/add-circular-outlined-button.svg');

const AddTransaction = () => (
  <React.Fragment>
    <div className="lead">
      <img alt="Add Transaction" className="icon" src={AddIcon} />
    </div>
    <div className="summary">
      <p>Add Transaction</p>
    </div>
  </React.Fragment>
);

export default AddTransaction;
