import * as React from 'react';

import './Landing.css';

class Landing extends React.Component {
  render () {
    return (
      <div className="auth">
        <div className="wrapper">
          <div className="header">
            <h2>Spendree</h2>
            <h5>Manage your expenses wisely.</h5>
          </div>

          {this.props.hasError && <p className="error">{this.props.error}</p>}
          <div>
            <button
              disabled={this.props.isLoggingIn}
              class="signInBtn facebook"
              onClick={this.onFacebooksignIn}
            >
              Login with Facebook
            </button>
            <button
              disabled={this.props.isLoggingIn}
              class="signInBtn google"
              onClick={this.onGooglesignIn}
            >
              Login with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;