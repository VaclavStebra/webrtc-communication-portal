import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Root from './components/Root';

const App = () => (
  <MuiThemeProvider>
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
