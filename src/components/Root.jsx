import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import TestPage from './TestPage/TestPage';
import ApplicationBar from './ApplicationBar';

export default class Root extends React.Component {
  render() {
    return (
      <div >
        <ApplicationBar />
        <div className="container" >
          <Router >
            <div >
              <Route
                path="/"
                exact
                component={HomePage}
              />
              <Route
                path="/test"
                component={TestPage}
              />
            </div >
          </Router >
        </div >
      </div >
    );
  }
}
