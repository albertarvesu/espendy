import * as React from 'react';

import './Landing.css';

export interface Props {
  hasError: boolean;
  error?: string;
  isLoggingIn?: boolean;
}

class Landing extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onFacebooksignIn = this.onFacebooksignIn.bind(this);
    this.onGooglesignIn = this.onGooglesignIn.bind(this);
  }

  onFacebooksignIn() {
    // this.props.signIn({
    //   provider: new auth.FacebookAuthProvider(),
    //   redirect: "/home",
    //   history: this.props.history
    // });
  }

  onGooglesignIn() {
    // this.props.signIn({
    //   provider: new auth.GoogleAuthProvider(),
    //   redirect: "/home",
    //   history: this.props.history
    // });
  }

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
              className="signInBtn facebook"
              onClick={this.onFacebooksignIn}
            >
              Login with Facebook
            </button>
            <button
              disabled={this.props.isLoggingIn}
              className="signInBtn google"
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