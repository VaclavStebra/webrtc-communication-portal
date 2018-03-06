import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { login } from './actions/userActions';

export class LoginPage extends React.Component {
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
              onClick={() => this.props.onLogin('vstebra@gmail.com')}
            />
            &nbsp;
            <RaisedButton
              label="Sign up"
              secondary
            />
          </div>
          <div className="top-separator">
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

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onLogin: (email) => {
    dispatch(login(email));
  }
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
