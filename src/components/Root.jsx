import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';

import HomePage from './HomePage/HomePage';
import TestPage from './TestPage/TestPage';

export default class Root extends React.Component {
  render() {
    return (
      <div >
        <AppBar
          title="WebRTC communication portal"
          showMenuIconButton={false}
        />
        <div className="container">
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
        </div>
      </div >
    );
  }
}
