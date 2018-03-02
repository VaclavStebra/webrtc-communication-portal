import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getTheme from './utils/theme';
import Root from './components/Root';

const App = () => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <Root />
  </MuiThemeProvider>
);

const mountPoint = document.getElementById('react');

ReactDOM.render(
  (
    <App />
  ),
  mountPoint
);
