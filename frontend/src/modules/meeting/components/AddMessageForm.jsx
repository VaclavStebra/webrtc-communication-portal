import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(event, text) {
    this.setState({ text });
  }

  handleSubmit() {
    this.props.submit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <TextField
          id="chatMessageInput"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        &nbsp;
        <RaisedButton
          label="Send"
          primary
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

AddMessageForm.propTypes = {
  submit: PropTypes.func.isRequired
};
