import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import AddTransactionModal from './components/AddTransactionModal/AddTransactionModal';

import 'react-router-modal/css/react-router-modal.css';
import './App.css';

const { store } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
          {/* <ModalRoute
              component={SettingsModal}
              path="/home/settings"
              className="modal-content settings"
            /> */}
            <ModalRoute
              component={AddTransactionModal}
              path="/home/add-transaction"
              className="modal-content add-new"
            />
            <ModalContainer containerClassName="modal-container" />
            <Switch>
              <Route path="/home" component={Home} />
              <Route exact={true} path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
