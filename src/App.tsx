import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

import './App.css';

const { store } = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
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
