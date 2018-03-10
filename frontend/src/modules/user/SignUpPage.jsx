import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import UserForm from './components/UserForm';
import { signup } from './actions/userActions';

export class SignUpPage extends React.Component {
  redirectIfSomebodyIsLoggedIn() {
    return this.props.isUserLoggedIn ? (
      <Redirect to="/" />
    ) : '';
  }

  renderCircularProgress() {
    if (!this.props.signupInProgress) {
      return '';
    }

    return (
      <div className="top-separator">
        <CircularProgress />
      </div>
    );
  }

  render() {
    return (
      <div className="center">
        {this.redirectIfSomebodyIsLoggedIn()}
        <h1>Sign Up</h1>
        <div>
          <UserForm
            submitText="Sign up"
            linkText="Log in"
            linkHref="/login"
            onSubmit={this.props.onSignup}
          />
          {this.renderCircularProgress()}
        </div>
        <Snackbar
          message="Something went wrong"
          open={this.props.signupFailure}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signupFailure: PropTypes.bool,
  signupInProgress: PropTypes.bool,
  onSignup: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool
};

SignUpPage.defaultProps = {
  signupFailure: false,
  signupInProgress: false,
  isUserLoggedIn: false
};

const mapStateToProps = state => ({
  signupFailure: state.user.uiState.signUpFailure,
  signupInProgress: state.user.uiState.signUpInProgress,
  isUserLoggedIn: state.user.data !== null
});

const mapDispatchToProps = dispatch => ({
  onSignup: (email, password) => {
    dispatch(signup(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
