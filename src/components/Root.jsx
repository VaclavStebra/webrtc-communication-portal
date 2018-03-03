import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ApplicationBar from './ApplicationBar';

export default class Root extends React.Component {
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
                  component={LoginPage}
                />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
