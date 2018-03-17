import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import UserForm from './components/UserForm';
import { login } from './actions/userActions';

export class LoginPage extends React.Component {
  renderCircularProgress() {
    if (!this.props.loginInProgress) {
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
        <h1>Login</h1>
        <div>
          <UserForm
            submitText="Log in"
            linkText="Sign up"
            linkHref="/signup"
            actionInProgress={this.props.loginInProgress}
            onSubmit={this.props.onLogin}
          />
          {this.renderCircularProgress()}
        </div>
        <Snackbar
          message="Invalid email or password"
          open={this.props.loginFailure}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginFailure: PropTypes.bool,
  loginInProgress: PropTypes.bool,
  onLogin: PropTypes.func.isRequired
};

LoginPage.defaultProps = {
  loginFailure: false,
  loginInProgress: false
};

const mapStateToProps = state => ({
  loginFailure: state.user.uiState.loginFailure,
  loginInProgress: state.user.uiState.loginInProgress
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => {
    dispatch(login(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
