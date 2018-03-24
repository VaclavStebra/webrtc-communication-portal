import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ApplicationBar from '../applicationBar/ApplicationBar';

import HomePage from '../home/HomePage';
import LoginPageContainer from '../user/LoginPage';
import SignupPageContainer from '../user/SignUpPage';
import CreateMeetingPageContainer from '../meeting/CreateMeetingPage';

import { loginUIReset, logout, signupUIReset } from '../user/actions/userActions';
import { createUIReset } from '../meeting/actions/meetingActions';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ApplicationBar
              isUserLoggedIn={this.props.isUserLoggedIn}
              onLogout={this.props.onLogout}
            />
            <div className="container">
              <div>
                <Route
                  path="/"
                  exact
                  component={HomePage}
                />
                <Route
                  path="/login"
                  exact
                  render={() => {
                    if (this.props.isUserLoggedIn) {
                      return <Redirect to="/meeting/create" />;
                    }
                    this.props.loginUIReset();
                    return <LoginPageContainer />;
                  }}
                />
                <Route
                  path="/signup"
                  exact
                  render={() => {
                    if (this.props.isUserLoggedIn) {
                      return <Redirect to="/" />;
                    }
                    this.props.signupUIReset();
                    return <SignupPageContainer />;
                  }}
                />
                <Route
                  path="/meeting/create"
                  exact
                  render={() => {
                    if (!this.props.isUserLoggedIn) {
                      return <Redirect to="/login" />;
                    }
                    this.props.createMeetingUIReset();
                    return <CreateMeetingPageContainer />;
                  }}
                />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

Root.propTypes = {
  isUserLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  loginUIReset: PropTypes.func,
  signupUIReset: PropTypes.func,
  createMeetingUIReset: PropTypes.func
};

Root.defaultProps = {
  isUserLoggedIn: false,
  onLogout: () => {},
  loginUIReset: () => {},
  signupUIReset: () => {},
  createMeetingUIReset: () => {}
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.data !== null
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  },
  loginUIReset: () => {
    dispatch(loginUIReset());
  },
  signupUIReset: () => {
    dispatch(signupUIReset());
  },
  createMeetingUIReset: () => {
    dispatch(createUIReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
