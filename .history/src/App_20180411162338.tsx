import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/signout" component={SignOut} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
