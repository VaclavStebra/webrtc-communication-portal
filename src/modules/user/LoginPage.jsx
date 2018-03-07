import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import { login } from './actions/userActions';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event, email) {
    this.setState({ email });
  }

  handlePasswordChange(event, password) {
    this.setState({ password });
  }

  handleSubmit() {
    const { email, password } = this.state;

    this.props.onLogin(email, password);
  }

  redirectIfSomebodyIsLoggedIn() {
    return this.props.isUserLoggedIn ? (
      <Redirect to="/" />
    ) : '';
  }

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
        {this.redirectIfSomebodyIsLoggedIn()}
        <h1>Login</h1>
        <div>
          <TextField
            hintText="Please enter your email address"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <br />
          <TextField
            hintText="Please enter your password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <br />
          <div className="top-separator">
            <RaisedButton
              label="Log in"
              primary
              onClick={this.handleSubmit}
              disabled={this.props.loginInProgress}
            />
            &nbsp;
            <RaisedButton
              label="Sign up"
              secondary
            />
          </div>
          <div className="top-separator">
            <RaisedButton
              label="Back"
              containerElement={<Link to="/" />}
            />
          </div>
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
  onLogin: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool
};

LoginPage.defaultProps = {
  loginFailure: false,
  loginInProgress: false,
  isUserLoggedIn: false
};

const mapStateToProps = state => ({
  loginFailure: state.user.uiState.loginFailure,
  loginInProgress: state.user.uiState.loginInProgress,
  isUserLoggedIn: state.user.data !== null
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => {
    dispatch(login(email, password));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
