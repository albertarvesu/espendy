import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { LandingTitle, LandingSubtitle } from './../Styled/LandingText';

import { auth } from './../../firebase';
import { signIn, SignInInterface } from './../../actions/auth';

import './Landing.css';

interface Props {
  hasError: boolean;
  error?: string;
  isLoggingIn?: boolean;
  signIn: SignInInterface;
}

export class Landing extends React.Component<Props> {
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
            <LandingTitle>eSpendy</LandingTitle>
            <LandingSubtitle>Manage your expenses wisely.</LandingSubtitle>
          </div>
          {this.props.hasError && <p className="error">{this.props.error}</p>}
          <div className="button-wrap">
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

export default compose(
  withRouter,
  connect(null, {
    signIn
  })
)(Landing);