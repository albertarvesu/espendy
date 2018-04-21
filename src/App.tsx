import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Routes from './components/Routes/Routes';

import 'react-router-modal/css/react-router-modal.css';
import './App.css';

const { store } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
