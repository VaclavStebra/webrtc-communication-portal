import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import UserForm from './components/UserForm';
import { signup } from './actions/userActions';

export class SignUpPage extends React.Component {
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
  onSignup: PropTypes.func.isRequired
};

SignUpPage.defaultProps = {
  signupFailure: false,
  signupInProgress: false
};

const mapStateToProps = state => ({
  signupFailure: state.user.uiState.signUpFailure,
  signupInProgress: state.user.uiState.signUpInProgress
});

const mapDispatchToProps = dispatch => ({
  onSignup: (email, password) => {
    dispatch(signup(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
