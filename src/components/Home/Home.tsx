import * as React from 'react';

import Box from './../Box/Box';
import Balance from './../Balance/Balance';
import AddTransaction from './../AddTransaction/AddTransaction';

import './Home.css';

class Home extends React.Component {
  componentDidMount() {
    document.body.classList.remove('landing');
  }
  render () {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="content">

            <Box type="lr" clazz="balance">
              <Balance amount={1000} currency="SGD" />
            </Box>

            <Box
              path="/add-transaction"
              title="Add New Transaction"
              type="td"
              clazz="tile-link add-new hvr-bounce-to-left"
            >
              <AddTransaction />
            </Box>

          </div>
        </div>

        <div className="sidebar" />

      </div>
    );
  }
}

export default Home;