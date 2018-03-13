import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from '../home/HomePage';
import LoginPageContainer from '../user/LoginPage';
import SignupPageContainer from '../user/SignUpPage';
import ApplicationBar from '../applicationBar/ApplicationBar';
import { logout } from '../user/actions/userActions';

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
                  component={LoginPageContainer}
                />
                <Route
                  path="/signup"
                  exact
                  component={SignupPageContainer}
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
  onLogout: PropTypes.func
};

Root.defaultProps = {
  isUserLoggedIn: false,
  onLogout: () => {}
};

const mapStateToProps = state => ({
  isUserLoggedIn: state.user.data !== null
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
