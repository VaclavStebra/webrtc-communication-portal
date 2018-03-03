import React from 'react';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="center">
        <h1>Login</h1>
        <div>
          <TextField
            hintText="Please enter your email address"
            floatingLabelText="Email"
          />
          <br />
          <TextField
            hintText="Please enter your password"
            floatingLabelText="Password"
            type="password"
          />
          <br />
          <div className="top-separator">
            <RaisedButton
              label="Log in"
              primary
            />
            &nbsp;
            <RaisedButton
              label="Back"
              containerElement={<Link to="/" />}
            />
          </div>
        </div>
      </div>
    );
  }
}
