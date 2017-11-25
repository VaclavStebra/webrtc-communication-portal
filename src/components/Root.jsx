import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage';
import TestPage from './TestPage';

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/"
            exact
            component={HomePage}
          />
          <Route
            path="/test"
            component={TestPage}
          />
        </div>
      </Router>
    );
  }
}
