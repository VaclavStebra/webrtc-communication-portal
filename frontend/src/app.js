import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getTheme from './utils/theme';
import RootContainer from './modules/root/Root';

import configureStore from './stores/configureStore';
import { loginSuccess } from './modules/user/actions/userActions';

const store = configureStore();

const token = sessionStorage.getItem('token');
if (token) {
  store.dispatch(loginSuccess(token));
}

const App = () => (
  <MuiThemeProvider muiTheme={getTheme()}>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </MuiThemeProvider>
);

const mountPoint = document.getElementById('react');

ReactDOM.render(
  (
    <App />
  ),
  mountPoint
);
