import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from '../home/HomePage';
import LoginPageContainer from '../user/LoginPage';
import ApplicationBar from '../applicationBar/ApplicationBar';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <ApplicationBar />
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
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data
});

export default connect(mapStateToProps)(Root);
