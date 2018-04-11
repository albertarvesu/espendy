import * as React from 'react';
import * as firebase from 'firebase';

import './Landing.css';

import { auth } from './../../firebase';

interface SignIn {
  (provider: firebase.auth.AuthProvider, redirect: string): void;
}

interface Props {
  hasError: boolean;
  error?: string;
  isLoggingIn?: boolean;
  signIn: SignIn;
}

class Landing extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onFacebooksignIn = this.onFacebooksignIn.bind(this);
    this.onGooglesignIn = this.onGooglesignIn.bind(this);
  }

  onFacebooksignIn() {
    this.props.signIn(new auth.FacebookAuthProvider(), '/home');
  }

  onGooglesignIn() {
    this.props.signIn(new auth.GoogleAuthProvider(), '/home');
  }

  render () {
    return (
      <div className="auth">
        <div className="wrapper">
          <div className="header">
            <h2>eSpendy</h2>
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