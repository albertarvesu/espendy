import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import SignOut from './components/SignOut/SignOut';
import AddTransactionModal from './components/AddTransactionModal/AddTransactionModal';
import SettingsModal from './components/SettingsModal/SettingsModal';
import TransactionsModal from './components/TransactionsModal/TransactionsModal';

import 'react-router-modal/css/react-router-modal.css';
import './App.css';

const { store } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <ModalRoute
              component={SettingsModal}
              path="/home/settings"
              className="modal-content settings"
            />
            <ModalRoute
              component={AddTransactionModal}
              path="/home/add-transaction"
              className="modal-content add-new"
            />
            <ModalRoute
              component={TransactionsModal}
              path="/home/transactions"
              className="modal-content transactions modal"
            />
            <ModalContainer containerClassName="modal-container" />
            <Switch>
              <Route exact={true} path="/" component={Landing} />
              <Route path="/home" component={Home} />
              <Route path="/signout" component={SignOut} />
              <Redirect to="/" push={true} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
