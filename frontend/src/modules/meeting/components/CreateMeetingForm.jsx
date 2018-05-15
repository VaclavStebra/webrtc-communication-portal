import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';

export default class CreateMeetingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      isPrivate: true
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleIsPrivateChange = this.handleIsPrivateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event, title) {
    this.setState({ title });
  }

  handleIsPrivateChange(event, isChecked) {
    this.setState({ isPrivate: isChecked });
  }

  handleSubmit() {
    const {
      title, isPrivate
    } = this.state;

    this.props.onSubmit({
      title,
      isPrivate
    }, this.props.token);
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Title of the meeting"
          floatingLabelText="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <br />
        <div className="toggle">
          <Toggle
            label="Private"
            defaultToggled
            onToggle={this.handleIsPrivateChange}
          />
        </div>
        <div className="top-separator">
          <RaisedButton
            label="Plan new meeting"
            primary
            disabled={this.props.actionInProgress}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

CreateMeetingForm.propTypes = {
  actionInProgress: PropTypes.bool,
  token: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

CreateMeetingForm.defaultProps = {
  actionInProgress: false,
  token: ''
};
