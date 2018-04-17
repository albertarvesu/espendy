import { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, SignOutInterface } from './../../actions/auth';

interface SignOutProps {
  signOut: SignOutInterface;
  history: any;
}

export class SignOut extends Component<SignOutProps> {
  componentWillMount() {
    this.props.signOut('/', this.props.history);
  }
  render() {
    return null;
  }
}

export default compose(
  withRouter,
  connect(null, {
    signOut
  })
)(SignOut);