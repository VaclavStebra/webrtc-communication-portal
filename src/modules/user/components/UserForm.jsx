import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event, email) {
    this.setState({ email });
  }

  handlePasswordChange(event, password) {
    this.setState({ password });
  }

  handleSubmit() {
    const { email, password } = this.state;

    this.props.onSubmit(email, password);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Please enter your email address"
          floatingLabelText="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <TextField
          hintText="Please enter your password"
          floatingLabelText="Password"
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <div className="top-separator">
          <RaisedButton
            label={this.props.submitText}
            primary
            onClick={this.handleSubmit}
            disabled={this.props.actionInProgress}
          />
          &nbsp;
          <RaisedButton
            label={this.props.linkText}
            secondary
            containerElement={<Link to={this.props.linkHref} />}
          />
        </div>
        <div className="top-separator">
          <RaisedButton
            label="Back"
            containerElement={<Link to="/" />}
          />
        </div>
      </div>
    );
  }
}

UserForm.propTypes = {
  submitText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  actionInProgress: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

UserForm.defaultProps = {
  actionInProgress: false
};
